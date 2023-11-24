---
title: 静态服务器 Static Server 与动态服务器
categories: 
- [Web -- Knowledge is infinite,Node]
tag: Node
---
# 静态服务器 Static Server 与动态服务器
**判断依据**
是否请求了数据库
没有请求数据库，就是静态服务器
请求了数据库，就是动态服务器
## 数据库
结构：一个数组
### 读取数据：
```javascript
xxx = fs.readFileSync('...').toString() //读取数据
xxxarray = JSON.parse(xxx) //反序列化，得到数组
```
### 存储数据:
```javascript
xxxstring = JSON.stringify(xxxarray) //序列化
fs.writeFileSync('...',xxxstring) //写入数据
```
## Cookie
### 定义
Cookie 是服务器下发给浏览器的一段字符串
浏览器必须保存这个 Cookie (除非用户删除)
之后发起相同的二级域名请求 （任何请求）时，浏览器必须附上 Cookie
### 防纂改 user_id
**加密（漏洞） or 把信息隐藏在服务器**
