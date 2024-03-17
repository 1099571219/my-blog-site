---
title: ReactEvent & DOMEvent
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
date: 2024-02-04
---

# ReactEvent & DOMEvent

## 区别

1. React 的 event 是 SyntheticEvent，模拟出来 DOM 的所有能力
2. event.nativeEvent 才是原生事件对象
3. 所有的事件，都被挂载到 document 上
4. 和 DOM 事件不一样，和 Vue 事件也不一样

```js
function App(){
    const getEvent =(e)=>{
        console.log(e.target)
        console.log(e.currentTarget)
        console.log(e.nativeEvent.target)
        console.log(e.nativeEvent.currentTarget)
    }
    return (
    <>
        <button onClick={getEvent} >click</button>    
    </>
    )
}
```


