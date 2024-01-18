---
title: DOM 编程
categories: 
- [Web -- Knowledge is infinite,前端,DOM 编程]
tag: DOM 编程
date: 2023-11-24
---
# DOM 编程
**Document Object Model 文档对象模型**
**JS就是用 document 操作网页**
### 获取任意元素、获取任意标签
**有很多API**
window.idxxx 或者直接 idxxx
document.getElementById('idxxx')
document.getElementsByTagNmae('div')[0]
document.getElementsByClassName('red')[0]
document.querySelector('#idxxx')
document.querySelectorAll('.red')[0]
最后两个是比较常用的
中间三个是兼容IE 的
### 获取特点元素
**获取 html 元素**
document.documentElement
**获取 head 元素**
document.head
**获取 body 元素**
document.body
**获取窗口 （窗口不是元素）**
window
**获取所有元素**
document.all (是第6个 falsy 值)
**获取到的元素都是对象**
### 节点 Node 包括以下几种
MDN 有完整描述， x.nodeType 得到一个数字
1 表示元素 Element, 也叫标签 Tag
3 表示文本 Text
8 表示注释 Comment
9 表示文档Document
11 表示文档片段 DocumentFragment
记住 1 和 3 即可
## 节点的增删改查
### 增
#### 创建一个标签节点
```javascript
let div1 = document.createElement('div')
document.createElement('style')
document.createElement('script')
document.createElement('li')
```
#### 创建一个文本节点
```javascript
text1 = document.createTextNode('你好')
```
#### 标签里面插入文本
不能用 div1.appendChild（'你好'）
```javascript
div1.appendChild(text1)
div1.innerText('你好')
div1.textContent('你好')
```
#### 插入页面中
创建的标签默认处于 JS 线程中
必须把他插到 head 或者 body 里面，它才会生效
```javascript
document.body.appendChild(div)
已在页面中的元素.appendChild(div)
```
**appendChid**
```javascript
let div = document.createElement('div')
test1.appendChild(div)
test2.appendChidl(div)
```
最终会出现在test2 中
一个元素不能出现在两个地方，除非复制一份
### 删
#### 两种方法
```javascript
div1.parentNode.removeChild(div1) //兼容IE
div1.remove()
```
如果一个node 被移出页面（DOM树）
还可以再加到页面中
删除后再 div1 = null 即可删除内存中的属性
### 改
#### 写标准属性
```javascript
改 class: div.className = 'red pink' （全覆盖）
改 class: div.classList.add('red')
改 style: div.style = 'width:100px;color:blue;'
改 style 的一部分 : div.style.width = '150px'
JS中大小写代替中线: div.style.backgroundColor = 'withe'
改 data-* 属性: div.dataset.x = 'lucas'
```
#### 读标准属性
都可以用，值可能稍微有些不同，下面的更保险一点
```javascript
div.classList / a.href
div.getAttribute('class') / a.getAttribute('href')
```
#### 改事件处理函数
**div.onclick 默认为 null**
默认点击 div 不会有任何事情发生
但是如果把 div.onclick 改为一个函数 fn
那么点击 div 的时候，浏览器就会调用这个函数
并且是这样调用的 fn.call(div,event)
div 会被当做 this
event 则包含了点击事件的所有内容，如坐标
**div.addEventListener**
是div.onclick 的升级版
#### 改内容
**改文本内容**
```javascript
div.innerText = 'xxx'
div.textContent = 'xxx'
```
两者几乎没区别

**改HTML 内容**
```javascript
div.innerHTML = '<strong>加粗内容</strong>'
```
**改标签**
```javascript
div.innerHTML = '' //清空
div.appendChild(div1) //加内容
```
#### 改父级
从原先的地方消失
```javascript
newParent.appendChild(div)
```
### 查
#### 查父级
```javascript
div.parentNode
div.parentElement
div.parentNode.parentNode
```
#### 查子级
```javascript
div.childNodes 
div.children
```
当子级变化时，两者也会实时变化
#### 查同级
```javascript
div.parentNode.childNodes  //要排除节点
div.parentNode.children //还要排除自己
```
#### 查看老大
```javascript
div.firstChild
```
#### 查看小儿
```javascript
div.lastChild
```
#### 查看上一个同级
```javascript
div.previousSibling //上一个元素兄弟
div.previousElementSibling //上一个元素兄弟，避开空格字符串
```
#### 查看下一个同级
```javascript
div.nextSibling //下一个节点兄弟
div.nextElementSibling //下一个元素兄弟，避开空格字符串
```
#### 遍历一个div的所有元素
```javascript
travel = (node,fn)=>{
	fn(node)
  if(node.children){
  	for(let i = 0;i<node.children.length;i++){
    	travel(node.children[i],fn)
    }
  }
}
travel(div1,(node)=>console.log(node))
```
## 跨线程操作
### 各线程各司其职
JS 引擎不能直接操作页面，只能操作JS
渲染引擎也不能操作JS，只能操作页面
document.body.appendChild(div1)
### 跨线程通信
当浏览器发现JS 在body 里面加了一个 div1 对象
浏览器就会通知渲染引擎在页面里也新增一个 div 元素
新增的 div 元素所有的属性都照抄 div1 对象
### 插入新标签的完整过程
#### 在 div1 放入页面之前
对div1 的所有操作都属于 JS线程内的操作
#### 把 div1 放入页面时
浏览器会发现 JS 的想法
就会通知渲染线程在页面中渲染 div1 对应的元素
#### 把 div1 放入页面之后
对 div1 的操作都有可能会触发重新渲染
div1.id = 'newId' 可能会重新渲染，也可能不会
div1.title = 'new' 也可能会重新渲染，也可能不会
如果连续对 div1 多次操作，浏览器可能会合并成一次操作，也可能不会，除非中间有能强制浏览器进行渲染的操作
### 属性同步
#### 标准属性
对 div1 的标准属性的修改，会被浏览器同步到页面中
比如 id 、 className、title 等
#### data-* 属性
同上
#### 非标准属性
对非标准属性的修改，只会停留在 JS 线程中
不会同步到页面里
**重点：如果有自定义属性，又想被同步到页面中，需使用 data-作为前嘴**
### Property & Attribute
#### property 属性
JS 县城中 div1 的所有属性，叫 property
#### attribute 属性
渲染引擎中 div1 对应标签的属性，叫 attribute
#### 区别
大部分时候，同名的 property 和 attribute 值相等
如果不是标准属性，那么他们只会在一开始时相等
**注意** attribute 只支持字符串
property 支持字符串、布尔等类型
## 封装DOM
### 术语
#### 库
提供给他人使用的工具代码叫做库
比如 jQuery、Underscore
#### API
库暴露出来的函数或属性叫做 API （应用编程接口）
#### 框架
当库变得很大，并且需要学习才能看懂时
这个库就叫做框架，比如 Vue / React
**ps.编程的术语没有固定的解释**
### 对象风格
#### 命名空间风格
window.dom 是创建的全局对象
#### 增
```javascript
dom.create('<div>1</div>') //用于创建节点
dom.after(div, div1) //用于新增弟弟 div1
dom.before(div, div1) //用于新增哥哥 div1
dom.append(div.div, div1) //用于新增子级 div1
dom.wrap(div, div1)//用于给div加个父亲 div1
```
#### 删
```javascript
dom.remove(node) //用于删除节点
dom.empty(parent) //用于删除后代
```
#### 改
```javascript
dom.attr(node,'title,?') //用于读写属性
dom.text(node,?) // 用于读写文本内容
dom.html(node,?) //用于读写HTML 内容
dom.style(node,{key:value}) //用于修改 style
dom.class.add(node,'className') //用于添加 class
dom.class.remove(node,'className') //用于删除 class
dom.on(node,'click',fn) //用于添加事件
dom.off(node,'click',fn) // 用于删除事件
```
#### 查
```javascript
dom.find('选择器') //用于获取标签或标签们
dom.parent(node) //用于获取父元素
dom.children(node) //用于获取子元素
dom.siblings(node) //用于获取兄弟姐妹同级元素
dom.next(node) //用于获取弟弟元素
dom.previous(node) // 用于获取哥哥元素
dom.each(nodes,fn) // 用于遍历所有节点
dom.index(node) // 用于获取排行
```
#### 代码
```javascript
window.dom = {
    create(string) {
        const container = document.createElement('template');
        console.log(container);
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        this.after(parent, node);
        this.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) { //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { //适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            } else if (typeof name === string) {
                return node.style[name]
            }
        }
    },
    calss: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
```

