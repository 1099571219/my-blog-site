---
title: event loop
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
---
# event loop
macro 中有未执行完毕的 micro 则会等待 micro 执行完毕
宏任务包含微任务的时候会在宏任务中同步任务执行后执行所有微任务
微任务中遇到宏任务时不会等待宏任务，而是直接把宏任务推入外部宏任务队列中
一个 script 中宏任务队列是唯一的
每个宏任务中又可以分别创建自己的微任务队列
## macro
script 本身
各种请求
计时器
## micro
Promise.then()
async/await
process.nextTick
