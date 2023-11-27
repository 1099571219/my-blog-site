---
title: computed 计算属性
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# computed 计算属性
computed 计算属性是一个根据响应式依赖改变时可以进行自动跟踪计算的函数，并且计算后会生成缓存，每次使用computed 计算属性时会直接读取上一次计算的结果也就是缓存结果，并不会去重新进行 getter 函数的执行，computed 计算属性有两种返回值，第一种是接受一个getter 函数并返回 只读 ref 对象，第二种是接受一个 含有 get 和 set 方法的对象并且返回可写的 ref 对象

