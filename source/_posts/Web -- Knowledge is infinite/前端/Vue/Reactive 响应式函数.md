---
title: Reactive 响应式函数
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
---
# Reactive 响应式函数
Reactive 函数适合创建对象类型的的响应式对象，创建的对象响应式在使用时会自动解包，无需使用.value 就可以访问，但在使用 数组和Map 响应式对象时无法自动解包，使用时需要加上.value ，跟 ref 的区别是在响应式为非数组和Map对象时，可以自动解包，并且插入 ref 属性时也可以自动解包
