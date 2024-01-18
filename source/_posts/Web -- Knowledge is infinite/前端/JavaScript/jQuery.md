---
title: jQuery 的使用
categories: 
- [Web -- Knowledge is infinite,前端,框架]
tag: 框架
date: 2023-11-24
---
# jQuery 的使用
## 关于 jQuery
### jQuery 是一个拥有链式风格且手动声明的函数
jQuery（选择器） 用于获取对应的元素，但它却不返回这些元素
相反，它返回一个对象，称为 jQuery 构造出来的对象
这个对象可以操作对应的元素 
### jQuery 是一个不需要加 new 的构造函数，非常意义规构造函数
因为 jQuery 函数确实构造出了一个对象
但因为不需要写 new jQuery() 就能构造一个对象
### jQuery 对象
不是说 jQuery 这个对象而是代指它所构造出的对象
## 一、如何获取元素
```javascript
$('#test') 返回值并不是元素，而是一个 api 对象
$('#test').find('.test') 查找 #test 里的 .test 元素
$('#test').parent() 获取父级
$('#test').children() 获取子级
$('#test').siblings() 获取兄弟元素
$('#test').index() 获取排行索引（从0开始）
$('#test').next() 获取当前元素的下一个元素
$('#test').prev() 获取当前元素的上一个元素
$('#test').each(fn) 遍历每个元素并执行 fn
```
## 二、链式操作是怎样的
jQuery（选择器） 用于获取对应的元素
但它却不返回这些元素
相反，它返回一个对象，称为 jQuery 构造出来的对象
这个对象可以操作对应的元素，即可形成操作链
```javascript
$('div')
    .find('.child2')
    .prev()
    .print()
```
## 三、如何创建元素
```javascript
$('<div><span>test</span></div>') 创建 div
.appendTo(document.body) 插入到 body 中
```
## 四、如何修改元素
```javascript
$div.text(?) 读写文本内容
$div.html(?) 读写 HTML 内容
$div.attr('title',?) 读写属性
$div.css({ color: 'red' }) 读写style
$div.addClass('blue')
$div.on('click', fn)
$div.off('click', fn)
```
```javascript
$div.remove()
$div.empty()
```
## 五、如何移动元素
```javascript
$('test2').insertAfter($('test1')); 把test1元素移动到test2后面
$('test1').after($('test2')); 把texst1元素移动到test2前面
```
表面上看，这两种方法的效果是一样的，实际上，它们返回的元素不一样。第一种方法返回test2元素，第二种方法返回test1元素。
**使用这种模式的方法还有四对：**
```javascript
.insertAfter()和.after()：在现存元素的外部，从后面插入元素

.insertBefore()和.before()：在现存元素的外部，从前面插入元素

.appendTo()和.append()：在现存元素的内部，从后面插入元素

.prependTo()和.prepend()：在现存元素的内部，从前面插入元素
```
## 六、如何修改元素的属性
使一个函数，来完成取值getter/赋值setter，即"getter"与"setter"合一。到底是取值还是赋值，由函数的参数决定。
```javascript
$('test1').html(); html()没有参数，表示取出test1的值
$('test1').html('测试'); html()有参数'测试'，表示对test1进行赋值
```
**元素常见的赋值与取值**
```javascript
.html() 取出或设置html内容

.text() 取出或设置text内容

.attr() 取出或设置某个属性的值

.width() 取出或设置某个元素的宽度

.height() 取出或设置某个元素的高度

.val() 取出某个表单元素的值
```
## 七、jQuery 是如何封装的
### 使用原型
把共用属性（函数）全部放到 $.protorype
$.fn = $.prototype 
然后让 api.__proto__ 指向 $.fn
### 封装
```javascript
window.$ = window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {  // 重载
    if (selectorOrArray[0] === '<') { 
      // 创建div
      elements = [createElement(selectorOrArray)]
    } else {
      // 查找 div
      elements = document.querySelectorAll(selectorOrArray)
    }
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  } else {
    elements = selectorOrArray
  }
  const api = Object.create(jQuery.fn)
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi
  })
  return api
};
jQuery.fn = jQuery.prototype = {
  jQuery: true,
  constructor: jQuery,
  find(selector) {
    let array = []
    this.each((node) => {
      array = array.concat(Array.from(document.querySelectorAll(selector)))
    })
    array.oldApi = this
    return jQuery(array)
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i)
    }
    return this
  },
  parent() {
    let array = []
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode)
      }
    })
    return jQuery(array)
  },
  children() {
    let array = []
    this.each((node) => {
      array.push(...node.children)
    })
    return jQuery(array)
  },
  siblings() {
    let array = []
    let array1 = []
    this.each((node) => {
      array.push(...node.parentNode.children)
    })
    for (let i = 0; i < array.length; i++) {
      if (array[i].className !== this.elements[0].className) {
        array1.push(array[i])
      }
    }
    return jQuery(array1)
  },
  index() {
    let array = []
    let i
    this.each((node) => {
      array.push(...node.parentNode.children)
    })
    for (i = 0; i < array.length; i++) {
      if (array[i].className === this.elements[0].className) {
        break
      }
    }
    return jQuery(i)
  },
  next() {
    let array = []
    let next
    this.each((node) => {
      array.push(...node.parentNode.children)
    })
    for (let i = 0; i < array.length; i++) {
      if (array[i].className === this.elements[0].className) {
        next = array[i].nextElementSibling
      }
    }
    return jQuery(next)
  },
  prev() {
    let array = []
    let prev
    this.each((node) => {
      array.push(...node.parentNode.children)
    })
    for (let i = 0; i < array.length; i++) {
      if (array[i].className === this.elements[0].className) {
        prev = array[i].previousElementSibling
      }
    }
    return jQuery(prev)
  },
  print() {
    return console.log(this.elements)
  },
  addClass(className) {
    this.each((node) => {
      node.classList.add(className)
    })
    return this
  },
  end() {
    return this.oldApi
  }
}
// $div.text(?) 读写文本内容
// $div.html(?) 读写 HTML 内容
// $div.attr('title',?) 读写属性
// $div.css({ color: 'red' }) 读写style
// $div.addClass('blue')
// $div.on('click', fn)
// $div.off('click', fn)
.....
```
