---
title: event loop
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-24
---
# event loop
遇微推入微队列，遇宏推入宏队列
macro 中有未执行完毕的 micro 则会等待 micro 执行完毕
宏任务包含微任务的时候会在宏任务中同步任务执行后执行所有微任务
微任务中遇到宏任务时不会等待宏任务，而是直接把宏任务推入宏任务队列中
## macro
script 本身
各种请求
计时器
## micro
Promise.then()
async/await
process.nextTick

## 测试一下

```typescript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  });
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  });
});
const p3 = new Promise((resolve, reject) => {
  resolve("5");
});
const p4 = new Promise((resolve, reject) => {
  reject("6");
});

p.then(() => {
  console.log("1");
}).then(() => {
  console.log("2");
});
p2.then(() => {
  console.log("3");
});
p.then(() => {
  console.log("4");
});
p3.then((res) => {
  console.log(res);
  return "7";
}).then((res) => {
  console.log(res);
});
p4.then(null, (res) => {
  console.log(res);
});
p3.then((res) => {
  console.log("8");
});

// 执行结果是
// 5 -> 6 -> 8 -> 7 -> 1 -> 4 -> 2 -> 3
/** 过程
macro :{
    p:{
        unsettled_promiseCallbacks:{
                1 => newPromise_unsettled_promiseCallbacks:{
                    2
                }
                4
        }
    }
    p2:{
        unsettled_promiseCallbacks:{
            3
        }
    }
}

micro:{
    p3:{
        settled_push_queueMicroTask 5:{
            5 => newPromise_unsettled_promiseCallbacks:{
                7
            }
        }
    }
    p4:{
        settled_push_queueMicroTask 6:{
            6
        }
    }
    p3:{
        settled_push_queueMicroTask:{
            8
        }
    }
}
 */
```
