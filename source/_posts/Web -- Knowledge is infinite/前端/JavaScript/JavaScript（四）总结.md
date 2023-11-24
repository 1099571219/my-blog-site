---
title: JavaScript（四）总结
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
---
# JavaScript（四）总结
## 知识点
### 基本概念
内存、变量、数据类型、对象
### 控制语句
if...else...
for...
### 对象
原型、原型链
对象分类
new 一个新对象
构造函数
this 的隐式传递和显式传递
## 重点
**原型**
**this**
**AJAX**
## 最重要的知识
### JS公式：
**对象.__proto__ === 其构造函数.prototype**
### 根原型公理：
**Object.prototype 是所有对象的原型**
### 函数公理：
**所有函数都是由 Function 构造的包括Object/Array/Function**
## 总结：
### 构造函数
是用来构造对象
会预先存好对象的类型，原型的原型是根
new 的时候将对象的 __p 指向原型
### 对象
所有对象都直接或间接指向根对象
如果对象想要分类，就在原型链上加一节
用构造函数可以加这一节



