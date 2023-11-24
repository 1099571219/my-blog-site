---
title: float 布局
categories: 
- [Web -- Knowledge is infinite,前端,CSS,CSS 布局]
tag: CSS 布局
---
# float 布局
### 步骤：
子元素上加 float:left / right和 width
在父元素上加 .clearfix 
任何元素都可以浮动，不管原先是什么模式的元素，添加浮动之后具有行内块元素相似的特性
如果行内元素有了浮动，则不需要转换块级\行内块元素就可以直接给高度和宽度
```css
span,
div {
  float: left;
  width: 200px;
  height: 200px;
  background-color: pink;
}
p {
  float: left;
  height: 300px;
  background-color: skyblue;
}
```
```html
<span>1</span>
    <span>2</span>
    <div>3</div>
    <div>4</div>
    <p>P</p>
```
#### 经验
留一些空间或者最后一个不设width
不需要做响应式，因为手机上没有 IE，而这个布局是专门为 IE 准备的
IE 6/7 存在双倍 margin bug ，解决办法有两个
一是针对 IE 6/7 把 margin 减半
二是再加一个 display: inline-block 

---

vertical-align:middle; 可以去掉图片下面的背景色
```css
.box .x .img {
  float: left;
  height: 150px;
  width: 191px;
  border: 10px solid pink;
  background-color: black;
  vertical-align: middle;
}
```

---

outline 替换 border 时使用，不占宽度
```css
.box .x .img {
  float: left;
  height: 150px;
  width: 191px;
  outline: 10px solid pink;
  background-color: black;
  vertical-align: middle;
}
```

---

margin-left:auto和margin-right:auto 只对块元素有用
```css
.box .x .img {
  float: left;
  height: 150px;
  width: 191px;
  outline: 10px solid pink;
  background-color: black;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
}
```

---

### 平均布局（负margin）:
如果要做平均布局，只需要在布局中间加上一个 x 盒子 ，x盒子右边距设成负的就可以装下子元素原本该换行的元素，而且不糊影响到父盒子的宽度,在 x 里加上 margin-right=-y 就行 ，y 是子盒子的平均间隔.
```css
.box {
  /* outline: 1px solid red; */
  width: 800px;
  /* height: 150px; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}

.x {
  /* outline: 1px solid green; */
  margin-right: -12px;
}

.box .x .img {
  border: 10px solid pink;
  height: 150px;
  width: 191px;
  margin-right: 12px;
  background-color: black;
  vertical-align: middle;
  float: left;
}
```

---

#### 经验
float 足以应付IE
float 要程序员自己计算宽度，不灵活
加上头尾（ hearer / footer ），即可满足所有PC页面需求
