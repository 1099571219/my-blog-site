---
title: DOM事件与事件委托
categories: 
- [Web -- Knowledge is infinite,前端,DOM 编程]
tag: DOM 编程
date: 2023-11-24
---
# DOM事件与事件委托
## 事件
### 点击事件
#### 2002年，W3C 发布标准
文档名为 DOM Level 2 Events Specification
规定浏览器应该同时支持两种调用顺序
**首先**按**从外到内**的**捕获顺序**查看是否有函数监听
**然后**按**从内到外**的**冒泡顺序**查看是否有函数监听
#### 术语
**从外向内**找监听函数，叫**事件捕获（网景）**
**从内向外**找监听函数，叫**事件冒泡（IE）**
**开发者自己选择把 fn 放在捕获阶段还是放在冒泡阶段**
#### addEventListener
**事件绑定 API**
**如果 bool 不传或为 falsy 值**
会让 fn 走冒泡，即当浏览器在冒泡阶段发现 div 有 fn 监听函数，就会调用fn，并提供事件信息
**如果 boll 值为 true**
会让 fn 走捕获，即当浏览器在捕获阶段发现 div 有 fn 监听函数，就会调用 fn，并提供事件信息
```javascript
IE 5*:div.attachEvent('onclick',fn) //冒泡
网景:div.addEventListener('click',fn) //捕获
W3C:div.addEventListener('click',fn,bool)
```
#### 小结
子级元素被点击后，父级也算被点击了
**捕获与冒泡**
捕获先调用父级的监听函数
冒泡先调用子级的监听函数
**W3C 事件模型**
先捕获（父级=>子级）再冒泡？（再子级=>父级）
注意这时 e 对象分别传给所有监听函数
事件结束后，e对象就不存在了
#### target && currentTarget
**区别**
**e.target **是用户操作的元素
**e.currentTarget **是程序员监听的元素
this 是 e.currentTarget
**举例**
div>span{文字}，用户点击文字
e.target 就是** span**
e.currentTarget 就是 **div**
**一个特例**
**背景**
只有一个 div 被监听（不考虑父子同时被监听）
fn 分别在捕获阶段和冒泡阶段监听 click 事件
用户点击的元素就是开发者监听的元素时
**代码**
```javascript
div.addEventListener('click',f1)
div.addEventListener('click',f2,true)
```
这时是先执行 f1 后执行的 f2
如果把两行内容调换位置后，先执行的就变成了f2
谁先监听谁先执行
#### 取消冒泡
**捕获是不能取消的，但是冒泡可以**
**e.stopPropagation() **可中断冒泡，浏览器不再向上（外）走
一般用于封装某些独立的组件
#### 不可取消冒泡
**有些事件不可取消冒泡**
英文版（不翻译） MDN 搜索 scroll event，看到 Bubbles 和 Cancelable
Bubbles 的意思是该事件是否冒泡
Cancelable 的意思是开发者是否可以取消冒泡
#### 如何阻止滚动
**scroll 事件不可取消冒泡**
阻止 scroll 默认动作没用，因为有滚动才有滚动事件
要阻止滚动，可以阻止 wheel 和 touchstart 的默认动作
**通过preventDefault() 方法阻止默认动作**
注意要找准滚动条所在的元素
但是滚动条还能用，可以用CSS 让滚动条宽度为0
**CSS也行**
使用 overflow:hidden 可以直接取消滚动条
但此时 JS 依然可以修改 scrollTop
#### 小结
**target 和 currentTarget**
一个是用户点击的，一个是开发者监听的
**取消冒泡**
e.stopPropagation()
**事件的特性**
Bubbles 表示是否冒泡
Cancelable 表示是否支持开发者取消冒泡
比如 scroll 不支持取消冒泡
**如何禁用滚动**
取消特定元素的 wheel 和 touchstart 的默认动作
### 自定义事件
```javascript
button1 = document.querySelector('button')
button1.addEventListener('click', () => {
  const event = new CustomEvent('lucas', {
    detail: { name: 'lucas', age: 18 }
  })
  button1.dispatchEvent(event)
})
button1.addEventListener('lucas', (e) => {
  console.log(e.detail)
})
```
### 事件委托
委托一个元素帮我监听本该我监听的元素
#### 场景一
要给100个按钮添加点击事件，只需要监听这100个按钮的父级，等冒泡的时候判断target是不是这100个按钮中的一个
#### 场景二
监听目前并不存在的元素的点击事件只需要监听父级，等点击的时候看看是不是我想要监听的元素即可
#### 优点
省监听数（内存）
可以监听动态元素
### 封装事件委托
```javascript
setTimeout(() => {
  const button = document.createElement('button')
  button.textContent = 'click 1'
  div1.appendChild(button)
}, 1000)

on('click', '#div1', 'button', () => {
  console.log('点击了 button')
})
function on(eventType, element, selector, fn) {
  if (!(element === Element)) {
    element = document.querySelector(element)
  }
  element.addEventListener(eventType, (e) => {
    const t = e.target
    if (t.matches(selector)) {
      fn(e)
    }
  })
}
```

