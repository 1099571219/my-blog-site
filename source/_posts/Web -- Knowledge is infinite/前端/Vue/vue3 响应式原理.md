---
title: vue3 响应式原理
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# vue3 响应式原理
响应式就是会自动跟踪依赖的变化，当依赖发生改变时会触发所有追踪该依赖的副作用函数执行，
在 JS 中，没有办法直接对变量的变更进行追踪，但可以对对象属性的读写进行追踪，有两种劫持 property 的访问方式，分别是 getter / setter  和 Proxies ，对属性依赖进行劫持后可以进行响应式依赖化，每当检测到响应式依赖变更时会自动查找订阅该依赖的副作用函数集合，之后执行这些副作用函数就可以达到响应式变化的效果

## defineProperty 和 Proxy 的区别
- Object.defineProperty只能对单个属性进行控制，而Proxy可以对整个对象进行控制。这意味着Proxy可以拦截更多的操作，比如has、deleteProperty、ownKeys等。而且Proxy不需要遍历对象的每个属性来定义拦截器函数，更加方便和高效。
- Object.defineProperty会直接修改原始对象，而Proxy会在原始对象之上创建一个代理层。这意味着使用Object.defineProperty时，我们可以直接操作原始对象来触发拦截器函数，而使用Proxy时，我们必须操作代理对象才能触发拦截器函数。这也导致了一个问题：如果我们在代码中混用了原始对象和代理对象，可能会造成一些混乱和不一致。
- Object.defineProperty有一些兼容性问题，在低版本浏览器中可能无法正常工作。而Proxy是ES6中引入的新特性，在高版本浏览器中才支持。因此，在实际开发中需要考虑到目标环境是否支持这两种方式。

