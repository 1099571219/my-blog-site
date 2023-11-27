---
title: flex 布局
categories: 
- [Web -- Knowledge is infinite,前端,CSS,CSS 布局]
tag: CSS 布局
date: 2023-11-24
---
# flex 布局
#### 容器 container
#### 内容 items

---

### 属性：
#### flex-direction 主轴对齐方式
flex-direction是设置主轴的方向即项目的排列方向，分为X轴和Y轴，行或列
默认值是X轴 从左到右的
主轴和侧轴是会变化的，就看flex-direction设置谁为主轴，剩下的就是侧周。而我们的子元素是跟着主轴来排列的
row 默认值从左到右
row-reverse 从右到左
column 从上到下
column-reverse 从下到上

```css
div {
  /* 默认主轴是X轴 行 row   那么y轴就是侧轴我们的元素是跟着主轴来排列的*/
  display: flex;
  width: 80%;
  height: 300px;
  background-color: pink;
  /* flex-direction: row-reverse; 翻转*/
  flex-direction: column;
  /* 设置主轴为y轴 列 */
}
div span {
  width: 150px;
  height: 100px;
  background-color: purple;
}
```

---

#### flex-wrap:换行
默认情况下flex-wrap 的值是 no-wrap
wrap 换行
wrap-reverse 换行且翻转
```css
div {
  display: flex;
  width: 80%;
  height: 300px;
  flex-wrap: wrap;
}
```

---

#### justify-content改变主轴内容的排列方式
使用之前一定要确定好主轴是哪个
是设置主轴上子元素的排列方式
```css
div {
  display: flex;
  width: 80%;
  height: 300px;
  background-color: pink;
  /* 默认的主轴是X轴 */
  /* justify-content: flex-start;*/
  /* 默认的是flex-start */
  /* justify-content: flex-end; */
  /* 让我们子元素居中对齐 */
  /* justify-content: center; */
  /* 平分剩余空间 */
  /* justify-content: space-around; */
  /* 先两边贴边再分配剩余空间（重要） */
  justify-content: space-between;
}
```

---

#### align-items改变次轴的对齐方式
```css
div {
  display: flex;
  width: 800px;
  height: 300px;
  background-color: pink;
  flex-direction: column;
  /* 主轴居中 */
  justify-content: center;
  /* 需要一个侧轴居中 */
  align-items: center;
  /* 拉伸，但是子盒子不要给高度 */
  /* align-items: stretch; 了解 */
}
```

---

#### 多行内容是使用align-content
align-content只能用于子项出现换行的情况（多行），在单行下是没有效果的
```css
div {
  display: flex;
  width: 800px;
  height: 500px;
  background-color: pink;
  /* 换行 */
  flex-wrap: wrap;
  /* 因为有了换行，此时我们侧轴上控制的子元素的对齐方式我们用align-content */
  /* align-content: flex-start; */
  /* align-content: center; */
  /* align-content: space-between; */
  /* align-content: space-around; */
  justify-content: space-between;
  align-content: space-between;
}
```

---

### item 属性：
#### order 属性可以改变 flex显示内容顺序
first-child{} 意思是选择第一个类为 item 的元素
nth-child(){} nth意思是第n个 (index顺序数值)
```css
/* 让2号盒子到1号盒子前面 */
div span:nth-child(2) {
  order: -1;
}

div span:nth-child(1) {
  align-self: flex-end;
}

/* 只让3号盒子下来底侧 */
div span:nth-child(3) {
  align-self: flex-end;
}
```

---

#### flex-grow:如果有多余的空间就把空间分给带有该属性的元素，冒号后面跟份数
```css
section div:nth-child(1) {
  width: 150px;
  height: 150px;
  background-color: purple;
}

section div:nth-child(2) {
  flex: 1;
  background-color: red;
}

section div:nth-child(3) {
  width: 150px;
  height: 150px;
  background-color: skyblue;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636103733341-4f33acf8-10ef-4bd2-93b3-8397100a67de.png#clientId=u4e882820-c270-4&from=paste&height=105&id=ua0515498&originHeight=210&originWidth=773&originalType=binary&ratio=1&size=3681&status=done&style=none&taskId=u39696b19-4224-4b0b-b61a-5b4a02003be&width=386.5)

---

#### flex-shrink 控制变窄程度
一般写flex-shrink:0 防止变瘦，默认是1,同步变窄
在空间不足以放下元素本身时，谁的数字越大谁缩小的越快
```css
.item:first-child {
  flex-grow: 1;
  flex-shrink: 10;
}

.item:nth-child(2) {
  flex-grow: 1;
  flex-shrink: 0;
}

.item:nth-child(3) {
  flex-grow: 1;
  flex-shrink: 10;

}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636103826817-64e30ddb-861e-4c09-965d-82ddc531cdfd.png#clientId=u4e882820-c270-4&from=paste&height=106&id=uca12c19a&originHeight=212&originWidth=764&originalType=binary&ratio=1&size=4334&status=done&style=none&taskId=u6948be11-3719-4b4a-bdfb-a763eddf8dc&width=382)

---

#### align-self: flex-end 某一个item可以特立独行，写在元素里
```css
/* 让2号盒子下来底侧 */
div span:nth-child(2) {
  align-self: flex-end;
} 
/* 让3号盒子下来底侧 */
div span:nth-child(3) {
  align-self: flex-end;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636103593687-f6a4de77-2264-466c-821c-551315418d81.png#clientId=u4e882820-c270-4&from=paste&height=202&id=uea33ef78&originHeight=404&originWidth=671&originalType=binary&ratio=1&size=6691&status=done&style=none&taskId=u8169a5f0-4b40-4e31-904d-72b8c7e952e&width=335.5)

---

#### 重点
记住这些常用代码
display: flex
flex-direction: row / column
flex-wrap : wrap
just-content: center / space-between
align-items:center

---

#### 经验
永远不要吧width 和 height 写死，除非特殊说明
用 min-width / max-width / min-height / max-height
flex 可以基本满足所有需求
flex 和 margin-x: auto 配合有意外的效果
#### 写死
width:100px
#### 不写死
width:50%
max-width:100px
width :30vw
min-width:80%
特点：不使用 px，或者min max 前缀

