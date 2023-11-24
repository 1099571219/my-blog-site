---
title: MVC
categories: 
- [Web -- Knowledge is infinite,前端,框架]
tag: 框架
---
# MVC
设计模式是个框，什么都能往里装
**MVC就是一个万金油，所有的页面都可以使用MVC来优化代码结构**
### MVC
每个模块都可以写成三个对象，分别是 M、V、C
M - Model 是数据模型，负责操作所有数据
V - View 是视图，负责用户界面
C - Controller 是控制器 ， 负责监听用户事件，然后调用 M 和 V 更新数据和视图
```javascript
const eventBus = $(window)
// 数据相关都放到m
const m = {
  data: {
    n: parseInt(localStorage.getItem('n'))
  },
  create() { },
  delete() { },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', m.data.n)
  },
  get() { }
}
// 视图相关都放到v
const v = {
  el: null,
  html: `
  <div>
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">*2</button>
      <button id="divide2">÷2</button>
    </div>
  </div>
`,
  init(container) {
    v.el = $(container)
  },
  render(n) {
    if (v.el.children.length !== 0) v.el.empty()
    $(v.html.replace('{{n}}', n))
      .appendTo(v.el)
  }
}
// 其他都c
const c = {
  init(container) {
    v.init(container)
    v.render(m.data.n) // view = render(data)
    c.autoBindEvents()
    eventBus.on('m:updated', () => {
      console.log('here')
      v.render(m.data.n)
    })
  },
  events: {
    'click #add1': 'add',
    'click #minus1': 'minus',
    'click #mul2': 'mul',
    'click #divide2': 'div',
  },
  add() {
    m.update({ n: m.data.n + 1 })
  },
  minus() {
    m.update({ n: m.data.n - 1 })
  },
  mul() {
    m.update({ n: m.data.n * 2 })
  },
  div() {
    m.update({ n: m.data.n / 2 })
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      v.el.on(part1, part2, value)
    }
  }
}

export default c
```
### EventBus
负责**对象间**的**通信**
是拥有监听、触发事件等能力的一个空对象
使用 eventBus 可以满足最小知识原则，m 和 v 互相不清楚对方的细节，但是却可以调用对方的功能
```javascript
拥有$.on .off .trigger 等API
```
### 表驱动编程
当看到大批类似但不重复的代码时就可以使用表驱动编程
把重要的数据做成哈希表
表驱动编程可以减少重复的代码，只需要将重要的信息放在表里，然后利用表来编程
```javascript
events: {
  'click #add1': 'add',
  'click #minus1': 'minus',
  'click #mul2': 'mul',
  'click #divide2': 'div',
}
```
### 关于 JS 的模块
可以使用 export default x 将一个变量默认导出给外部使用
可以使用 import x from './x.js/' 引用另一个模块到处的默认变量
可以使用 import (x) from './xxx.js' 引用另一个模块导出的名为 x 的变量
详细的参考MDN
[JavaScript modules 模块 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
### 总结：
把代码按照功能和数据分成多个模块，计算器模块，列表模块，娱乐模块等等。模块可以理解为这个世界上有不同的行业，也可以理解为一个项目里也有不同的分工，所以分模块可大可小，可以在大的模块里去区分子模块。总之模块是为了解决功能之间的区分问题，但模块之间并不会区分的很彻底，就像各行部分总会有所关联。
#### 


