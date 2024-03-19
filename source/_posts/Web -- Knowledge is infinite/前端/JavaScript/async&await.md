---
title: async & await
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-24
---
# async & await

执行到 await 时才会把当前 async 函数未执行完的操作压入微任务队列中等待执行
Promise.resolve() 是同步执行的，会立即返回一个值为 undefined 的 Promise 对象
await 非 Promise 对象则会变成 await Promise.resolve() 将其包裹起来，比如 await 2 =》 await Promise.resolve(2)

```javascript
async function async1() {
    console.log(1)
    await async2()
    console.log(2)
}
const async2 = async () => {
    await setTimeout((_) => {
        Promise.resolve().then((_) => {
            console.log(3)
        })
        console.log(4)
    }, 0)
}
const async3 = async () => {
    Promise.resolve().then(() => {
        console.log(6)
    })
}
async1()
console.log(7)
async3()

/*
sync:{
    cl(1)
    cl(7)
}

micro:{
    //await setTimeout 相当于 await Promise.resolve(timerId)
    await_Promise.resolve(timerId):{
        settled_push_queueMicroTask:{
            // 接着就执行到 await ，await 会将 async2 剩下的代码压入微任务队列
            'return undefined'
        } 
        //这下 async2 才是真的执行完毕 await async2 会返回一个 unSettled 状态的 Promise 对象
        //async2 执行后到 await ，async1 剩下操作压入微任务队列
        => newPromise_unSettled_push_promiseCallbacks:{
            cl(2)
        }
    }
    Promise.resolve().then(cb):{
        settled_push_queueMicroTask:{
            cb(6)
        }
    }
}

macro:{
    setTimeout:{
        sync:{
            cl(4)
        }
        //Promise.resolve() 为同步执行返回一个值为 undefined 的 Promise 对象，紧接着调用 .then() 判断状态
        micro:{
            Promise.resolve().then():{
                settled_push_queueMicroTask:{
                    cl(3)
                }
            }
        }
    }
}
*/


```


