---
title: CSS 基础
categories: 
- [Web -- Knowledge is infinite,前端,CSS,CSS基础]
tag: CSS基础
---
# CSS 基础
## 基本概念：
### 要理解几个重要的概念
文档流 Normal Flow
块（ block ）、内联（ inline ）、内联块 （ inline-block）

---

#### 文档流
文档流指的是流动方向：从左到右和从上到下
inline 元素从左到右排列知道排满换行，宽高直接设置是无效的
block 元素从上到下，块各占一行，所有块元素都可以设置宽度和高度以及内外边距
inline-block 也是从左到右，同时具有块元素和行内元素的特点，
符合一行显示多个以及可以设置宽度、行高、内外边距的称为行内块元素

---

#### 宽度
inline 宽度为内部 inline 元素的和，不能用width指定
block默认自动计算宽度，可用width指定
inline-block 结合前两者特点，可用width

---

#### 高度
inline 高度由 line-height 间接确定，跟height无关
block 高度由内部文档流元素决定，可以设height
inline-block 跟 block 类似，可以设置 height
inline-blobk不会处于跨行显示，不会处于两行中间

---

#### 脱离文档流
有些元素可以不在文档流中
float 浮动
position: absolute / fixed 绝对定位/固定定位

---

### 盒模型：
#### 两种盒模型
content-box 内容盒  内容就是盒子的边界
border-box 边框盒 边框才是盒子的边界
border-box 更好用
#### 公式
content-box width = 内容的宽度
border-box width = 内容的宽度 + padding + border
```css
.content-box {
  border: 2px solid red;
  margin: 25px;
  padding: 15px;
  box-sizing: content-box;
  width: 200px;
}
.border-box {
  border: 2px solid green;
  margin: 25px;
  padding: 15px;
  box-sizing: border-box;
  width: 200px;
}
```

---

### Overflow 溢出：
内容的宽度或高度大于容器时，会溢出
可用 overflow 来设置如何显示
auto 是灵活设置（滚动条）
scroll 是永远显示（滚动条）
hidden 是直接隐藏溢出部分
visible 是直接显示溢出的部分

---

### margin 合并：
#### 哪些情况会合并
父子 margin 合并
兄弟 margin 合并
#### 如何阻止合并
父子合并用
 padding 或 border 挡住
 overflow: hidden  挡住
```css
.father {
  width: 400px;
  height: 400px;
  background-color: pink;
  margin-top: 50px;
  /* border: transparent 1px solid; */
  /* padding: 1px; */
  overflow: hidden;
  /* 用于解决父盒子塌陷合并的问题 */
}

.son {
  width: 200px;
  height: 200px;
  background-color: skyblue;
  margin-top: 20px;
}
```
#### 兄弟合并是符合预期的
兄弟合并可以用 inline-block 消除
#### 要死记

---

## 基本单位:
#### 常用长度单位
px 像素
em 相对于自身 font-size 的倍数
百分数
整数
vw 和 vh
#### 颜色
十六进制#FF6600 可以写成 #F60
RGBA 颜色 rgb(0,0,0) 或者 rgba(0,0,0,1)
hsl 颜色 hsl(360,100%,100%)
