---
title: CSS 定位
categories: 
- [Web -- Knowledge is infinite,前端,CSS]
tag: CSS
date: 2023-11-24
---
# CSS 定位
## 布局和定位的区别：
布局是屏幕平面上的，定位是垂直于屏幕的
```css
/* 浮动的元素不会压住下面标准流的内容*/
/* 绝对定位和固定定位会完全压住盒子内的内容 */
/* 浮动最初是为了做文字环绕效果的 */
```

---

## DIV的分层：
#### Z轴视角从上到下分别为
内联元素 > 浮动元素 > 块级子元素 > border > background
内联元素与浮动等内联元素的覆盖是具有层叠性的
```css
/* z是z轴的意思 
选择器{z-index:1;} 数值可以是正整数，负数或0，默认是auto，数值越大,盒子越靠上 */
/* 如果属性值相同，则按照书写顺序，后来居上 */
.xiongda {
  background-color: red;
  z-index: 1;
}
.xionger {
  background-color: green;
  left: 50px;
  top: 50px;
}
.xiongsan {
  background-color: blue;
  left: 100px;
  top: 100px;
}
```

---

## 属性：
#### position
static 默认值，处于文档流中
relative 相对定位，会浮起来，但不脱离文档流
```css
.yeye {
  position: relative;
  width: 800px;
  height: 800px;
  background-color: steelblue;
}

.father {
  /* position: relative; */
  width: 500px;
  height: 500px;
  background-color: skyblue;
}

.son {
  position: absolute;
  /* top: 10px;
  left: 10px; */
  top: 100px;
  right: 200px;
  width: 200px;
  height: 200px;
  background-color: pink;
}
```
abosolute 绝对定位，根据祖级元素定位，脱离文档流
加了绝对定位的盒子不能通过margin:auto设置水平居中
```css
.box {
  position: absolute;
  /* 1.left走50% */
  left: 50%;
  top: 50%;
  /* 2.margin:left往左走自己的一半 */
  margin-left: -100px;
  margin-top: -100px;
  width: 200px;
  height: 200px;  
  background-color: pink;
  /* margin: auto; */
}
```
fixed 固定定位，根据 viewport 进行定位
主要使用场景：可以在浏览器页面滚动时元素的位置不会改变
```css
.hs {
  position: fixed;
  left: 50%;
  top: 200px;
  margin-left: 400px;
}
```
 sticky 粘贴定位，根据与窗口之间的距离判断是否固定。
```css
/* 粘性定位可以被认为是相对定位和固定定位的混合。Sticky粘性的 */
/* 以浏览器的可视窗口为参照点移动元素（固定定位的特点） */
/* 粘性定位占有原先的位置（相对定位的特点） */
/* 必须添加top/left/right/bottom其中一个才有效 */
/* 带有粘性定位的元素移动到可视窗口边缘达到属性值的范围是会变成固定定位属性的元素 */
.nav {
  position: sticky;
  top: 10px;
  width: 800px;
  height: 50px;
  background-color: pink;
  margin: 100px auto;
}
```

---

#### 子绝父相
如果写了一个absolute，一般都得在父级补一个relative
如果写了absolut 或 fixedk，一定要补充 top 和  left
子绝父相是永远不变的，如果父元素不需要占有位置则是子绝父绝
