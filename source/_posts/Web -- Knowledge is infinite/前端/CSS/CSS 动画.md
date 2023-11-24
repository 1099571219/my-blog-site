---
title: CSS 动画
categories: 
- [Web -- Knowledge is infinite,前端,CSS]
tag: CSS
---
# CSS 动画
## 定义
由许多静止的画面帧组成
以一定的速度连续播放
而产生的动画效果
## 概念
帧：每个静止的画面都叫做帧
播放速度：每秒24帧（电影）。每秒60帧（游戏）
## 浏览器渲染过程
#### 步骤
根据 HTML 构建 HTML 树 （DOM）
根据 CSS 构建 CSS 树 （CSSOM）
将两棵树合并成一颗渲染树 （render tree）
Layout 布局 （文档流、盒模型、计算大小和位置）
Paint 绘制 （把边框颜色、文字颜色、阴影等画出来）
Compose 合成 （根据层叠关系展示画面）

---

### 更新样式
#### 一般采用 JS 来更新样式
比如 div.style.background = 'red' 加样式
比如 div.style.display = 'none' 加样式
比如 div.classList.add('red') 加类
比如 div.remove() 直接删除节点
#### 这些方法的不同之处
**有三种不同的渲染方式**

1. div.remove() 全走 ---- JS / CSS > 样式 > 布局 > 绘制 > 合成
```javascript
setTimeout(() => {
  demo.remove()
}, 3000)
```

2. 改变背景颜色 跳过layout ---- JS / CSS > 样式 > 绘制 > 合成
```javascript
setTimeout(() => {
    demo.style.background = 'red'
}, 3000)
```

3. 改变 transform 跳过 layout composite ---- JS / CSS > 样式 > 合成
```javascript
setTimeout(() => {
    demo.style.transform = 'translateX(100px)'
}, 3000)
```

---

### 一个简单的例子：将 div 从左往右移动
```javascript
var n = 1
var id = setInterval(() => {
  if (n <= 200) {
    demo.style.left = n + 'px'
    n = n + 1
  } else {
    console.log('1')
    clearInterval(id)
  }
}, 1000 / 60)
```
#### 原理
每过一段时间（用 setInterval 做到）
将 div 移动一小段距离
直到移动到目标地点
#### 注意性能
绿色表示重新绘制了（ repaint ）了
CSS 渲染过程依次包含布局、回执、合成
其中布局和绘制有可能被省略

---

### 第二种不用 left 做动画，用 transform (变形) ,提升效能
```javascript
setTimeout(() => {
  demo.classList.add('end')
}, 3000)
```
#### 原理
transfoem: translateX (  0 => 300px)
直接修改会被合成，需要等一会修改
transition 过毒属性可以自动脑补中间的帧
#### 注意性能
并没有 repaint (重新绘制)
比改 left 性能好

---

### 可以通过 CSS Triggers 查看 每个浏览器会触发的流程
https://csstriggers.com/

---

### CSS动画优化
#### JS优化
使用 requestAnimationFrame 代替 setTimeout 或 setInterval
#### CSS 优化
使用 will-change 或 translate

---

### transform
#### 四个常用功能
位移 translate
缩放 scale
旋转 rotate
倾斜 skew
**经验**
一般都需要配合 transition 过度
inline 元素不支持 transform，需要先变成 block

---

#### transform 之 translate
**常用写法**
translateX(<length-percentage>)
translateY(<length-percentage>)
translate(<length-percentage>,<length-percentage>？)
translageZ(<length>) 且父容器 perspevtive
translage3d(x,y,z)
```css
transform: translateX(200px);
transform: translateY(200px);
transform: translateZ(200px);
transform: translate(X,Y);
transform: translate3d(X,Y,Z);
```
**经验**
translate(-50%,-50%) 以自己为单位
可做绝对定位元素的居中
```css
position:absolute;
left: 50%;
top: 50%;
transform: translate(-100%,-100%);
```

---

#### transform 之 scale
**常用写法**
scaleX(<number>)
scaleY(<number>)
scale(<number>,<number>?)
**经验**
用的较少，因为容易出现模糊

---

#### transform 之 rotate
**常用写法**
rotate([<angle>|<zero>])
rotateZ([<angle>|<zero>])
rotateX([<angle>|<zero.])
rotateY([<angle>|<zero>])
**经验**
一般用于 360 度旋转制作 loading
用到时搜索 rotate MDN

---

#### transform 之 skew
**常用写法**
skewX([<angle>|<zero>])
skewY([<angle>|<zero>,[<angle>|<zero>]?)
**经验**
用的较少
用到时搜索 shew MDN

---

#### transform 多重效果
**组合使用**
transform:scale(0.5) translate(-100%,-100%)
transform:none;取消所有

---

### transition 过渡
#### 作用
补充中间帧
```css
#demo{
  width: 100px;
  height: 100px;
  margin: 300px;
  border: 1px solid red;
  transition: width 1s;
}
#demo:hover{
  width: 200px;
}
```
#### 语法
transition: 属性名 时长 过渡方式 延迟
transition:left 100ms linear
可以用逗号分割两个不同属性
transiton:left 200ms, top 400ms
可以用 all 代表所有属性
transition:all 200ms
过渡方式有：linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier | setp-start | step-end | steps，具体含义查询MDN
#### 注意
并不是所有属性都能过渡
display:none => block 没法过渡
一般改成 visibility: hidden => visible 
display 和 visibility 的区别 MDN有
**过度必须要有起始，一般只有一次或两次动画，比如 hover 和非 hover 状态的过渡**

---

### 如何达到多次过渡
#### 使用两次transform
,a === transforn ===> .b
,b === transforn ===> .c
用 setTimeout 或者监听 transitionend 事件
```css
#demo{
  width: 100px;
  height: 100px;
  margin: 300px;
  border: 1px solid red;
  transition: all 1s linear;
}
#demo.two{
  transform:translateY(200px);
}
#demo.th{
  transform:translateY(200px) translateX(200px);
}
```
```javascript
button.onlick = () => {
  demo.classList.add('two')
  setTimeout(() => {
    demo.classList.remove('two')
    demo.classList.add('th')
  }, 2000)
}
```

---

#### 使用 animation
声明关键帧
添加动画
加个 forward 就能让动画停在最后一帧
```css
#demo{
    width: 100px;
    height: 100px;
    margin: 300px;
    border: 1px solid red;
    /* transition: all 1s linear; */
}
#demo.start{
    animation: frm 1.5s;
}
@keyframes frm {
    0% {
        transform:none;
    }
    66% {
        transform:translateY(200px);
    }
    100%{
        transform:translateY(200px) translateX(200px)
    }
}
```

---

### animation 动画
#### 缩写语法
animation: 时长 | 过渡方式 | 延迟 | 次数 | 方向 | 填充模式	 | 是否暂停 | 动画名;
时长：1s 或者 1000ms
次数：3 或者 2.5或者 infinite
过渡方式：跟 transition 取值一样，如 linear
方向：reverse | alternate | alternate-reverse
填充模式：none | forwards | backwards | both
是否暂停：paused | running
这些属性都有单独的属性值

