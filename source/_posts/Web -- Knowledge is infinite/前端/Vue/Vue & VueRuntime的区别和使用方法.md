---
title: Vue & VueRuntime的区别和使用方法
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# Vue & VueRuntime的区别和使用方法
**版本分别是 包含编译器的 Vue 运行时 & 单独的 Vue 运行时**
## 基本概念

1. 运行时 + 编译器版本文件名：Vue.js。编译器用来将模板字符串编译成为 JavaScript 渲染函数的代码。
2. 只包含运行版：Vue.runtime.js。用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。
## template 和 render

1. 需要在客户端编译模板 (比如传入一个字符串给 **template** 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，这就是完整版：
```javascript
//需要编译器直接使用template
new Vue({
  template: '<div>{{ hi }}</div>'
})
```

2. 当使用 **vue-loader** 的时候， **.vue** 文件内部的模板会在构建时预编译成 JavaScript。在最终打好的包里是不需要编译器的，所以只用运行时版本即可。
```javascript
//不需要编译器,使用render
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

3. 区别

![](/images/vueRuntime.png)
最好使用Vue非完整版因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本