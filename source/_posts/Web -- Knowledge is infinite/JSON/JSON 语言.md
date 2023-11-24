---
title: JSON 语言
categories: 
- [Web -- Knowledge is infinite,JSON]
tag: JSON
---
# JSON 语言
**JSON 不是编程语言而是一门标记语言 **
**用来展示数据的**
## 语法
**查看官网 JSON 语法图，看完就会**
## 支持的数据类型
**string——** 只支持双引号，不支持单引号和无引号
**number——** 支持科学计数法
**bool ——**true 和 false
**null ——**没有 undefined
**object**
**array**
**注意与JS的七种数据类型区别**
**不支持函数，不支持变量，（也就不支持引用）**
## window.JSON
### JSON.parse
将符合 JSON 语法的字符串转换成 JS 对应类型的数据
JSON 字符串 => JS 数据
由于 JSON 只有六种类型，所以转成的数据也只有6种
如果不符合 JSON 语法，则直接抛出一个 Error 对象
一般用 try catch 捕获error错误
### JSON.stringify
是 JSON.parse 的逆运算
JS 数据 => JSON 字符串
由于JS 的数据类型比 JSON 多，所以不一定能成功
如果失败，就抛出一个 Error 对象

