---
title: Vue & VueRuntime的区别和使用方法
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
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

2. 当使用 **vue-loader **的时候，***.vue **文件内部的模板会在构建时预编译成 JavaScript。在最终打好的包里是不需要编译器的，所以只用运行时版本即可。
```javascript
//不需要编译器,使用render
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

3. 区别

![image.png](https://cdn.nlark.com/yuque/0/2021/png/21830680/1625739234452-bf265953-8c3d-4bf5-b686-e6b03d8b368b.png#clientId=u2407aaca-2908-4&from=paste&height=229&id=fprA2&originHeight=518&originWidth=1098&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90910&status=done&style=none&taskId=u81bd5dce-24e4-48aa-a758-b81c9b192b9&title=&width=486)
最好使用Vue非完整版因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。
## codesandbox.io
使用codesandbox.io, 点击浏览器右上角+号安装Chrome扩展应用, 我们就有了一个和本地VS Code一样体验的IDE![图片.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1639735153903-4ebc3cf5-64ca-4c6b-92ce-3f7648d3fed8.png#clientId=u55bccb25-cc8b-4&from=paste&height=595&id=u04ebbc5b&originHeight=1190&originWidth=2560&originalType=binary&ratio=1&rotation=0&showTitle=false&size=144414&status=done&style=none&taskId=uefd655a0-e424-4427-951f-10a2bb5f746&title=&width=1280)
