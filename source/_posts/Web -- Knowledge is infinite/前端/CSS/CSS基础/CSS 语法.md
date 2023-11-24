---
title: CSS 语法
categories: 
- [Web -- Knowledge is infinite,前端,CSS,CSS基础]
tag: CSS基础
---
# CSS 语法
## 标准的制定者：
#### W3C：搜索CSS spec 可以找到 CSS 最新标准

---

### 语法：
```css
选择器 {
  属性名：属性值；
  /*注释*/
}
div {
  width: 300px;
  height: 300px;
  background: rgba(210, 18, 0, .5);
}
```
** 注意避错:**
所有符号都是英文符号、区分大小写
任何地方写错了，都不会提示报错，浏览器会忽略
届时需要使用 Border 调试法查看是否有问题

---

### Border 调试法 步骤：
怀疑某个元素有问题
就给这个元素加 border
border 没出现？说明选择器错了或者语法错了
border 出现了？ 看看边界是否符合预期
bug 解决了才可以吧 border 删掉
```css
div {
  width: 300px;
  height: 300px;
  /* border: 30px solid pink; */
  /* 边框 的复合写法 */
  /* border-top: 10px solid pink;
  border-bottom: 20px dashed purple; */
  border: skyblue solid 20px;
  /* 层叠性 只是层叠了上边框 */
  border-top: red solid 20px;
}
```

---

### 常见错误：
选择器拼写错误
属性名拼写错误
属性值拼写错误
大小写错误
没写分号
中文冒号
没写反花括号
没加单位

---

### 素材网站推荐：
#### Freepik 、365PSD
每个类型的临摹一两个即可
PC端、手机端

## 




#### 



# 
