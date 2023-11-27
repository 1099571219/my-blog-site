---
title: watch和watchEffect
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# watch和watchEffect
watchEffect 有两个参数，第一个参数是 effect 副作用函数回调，创建就会立即执行，当 effect 函数中依赖的响应式对象变更时会重新执行effect 函数，effect 函数的参数是一个清理无效副作用的函数回调，默认在每次执行 effect 函数之前执行，可以通过 watchEffect 第二个参数中的 flush 属性进行修改，watchEffect 函数返回一个停止监听方法
会在组件卸载时自动停止，并且访问不到修改前的值
