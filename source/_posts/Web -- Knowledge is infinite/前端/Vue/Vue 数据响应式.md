---
title: Vue 数据响应式
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# Vue 数据响应式
若一个物体能对外界的刺激作出反应，它就是响应式
## Vue 的 data 是响应式
const vm = new Vue({data:{n:0}})
如果修改 vm.n，那么 UI  中的 n 就会响应我
Vue 2 通过 Object.defineProperty 来实现数据响应式
### 响应式网页
如果改变窗口大小，网页内容会做出相应，就是响应式网页
比如 
[Smashing Magazine — For Web Designers And Developers](https://www.smashingmagazine.com/)
## Object.defineProperty
可以给对象添加属性 value
可以给对象添加 getter/setter
getter/setter 用于对属性的读写进行监控
### 问题
```javascript
Object.defineProperty(obj,'n',{...})
```
必须要有一个 'n' ， 才能监听 & 代理 obj.n
如果没有给 n
Vue 会给出一个警告，Vue 只会检查第一层属性
Vue 没法监听一开始就不存在的属性
### 解决办法 
把 key 都声明好 或者使用 Vue.set & this.set
## Vue.set & this.$set
### 作用
新增 key
自动创建代理和监听（如果没有创建过）
触发 UI 更新 （但并不会立刻更新）
```javascript
this.$set(this.object,'m',100)
Vue.set(this.object,'m',100)
```
## 代理
一种设计模式，对 myData 对象的属性读写，全权由另一个对象 vm 负责，那么 vm 就是 myData 的代理，就好像房东租房需要中介
比如 myData.n 不用，偏要用 vm.n 来操作 myData.n
### vm = new Vue({data:myData})
1.会让 vm 成为 myData 的代理 (proxy)
2.会对 myData 的所有属性进行监控，以便于属性变动后的 rander(data) 调用
## 变异数组
### data 中有数组怎么办？
#### 没法提前声明所有的 key
数组的长度可以一直增加，下表就是 key ，没有办法提前把数组的 key  都声明出来
Vue 也不能检测对你新增了下标，人又不能每次改数组都用 Vue.set 或者 this.$set
#### 尤雨溪的方法
篡改数组的 API，新生成的 VueArray 会包含新的7个 API 用于覆盖Array中对应的 API，达到每次调用时会更新 UI
## 总结
### 对象中新增的 key
Vue 没有办法事先监听和代理
要使用 set 来新增 key，创建监听和代理，更新 UI 
最好提前把属性都写出阿狸，不要新增 key
但数组做不到 (不新增 key )
### 数组中新增的 key
this.$set 作用于数组时，并不会自动添加监听和代理  
使用 Vue 提供的数组变异 API 时，会自动添加监听和代理  
这7个API 方便对数组进行增删，会自动处理监听和代理，并更新 UI 
**结论：数组新增 key 最好通过7个 API**


## 
