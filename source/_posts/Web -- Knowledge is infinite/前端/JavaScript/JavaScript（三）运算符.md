---
title: JavaScript（三）运算符
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
---
# JavaScript（三）运算符
## 算术运算符
### number 运算
#### 加减乘除
#### 余数
正常来说 -1% 7 等价于 6%7 但在JS中
-1 % 7 = -1
#### 指数
x ** 2  x的平方
x** 3 x 的三次方
#### 自增自减
x++ / ++x / x-- / --x
x在前 值为+之前的值 ，x在后 则值为后
减同上
```javascript
let a = 5
a--
5
// a=4
--a
4
// a=4
```
#### 求值运算符
**+x**
```javascript
let a =8
+a
// 8
let a = -8
+a
// -8
```
#### 负数运算符
**-x**
```javascript
let a = 8
-a
// -8
let a = -8
-a
// 8
```
### string 运算
**字符串只支持 +号运算 连接运算**
如果JS 遇到 数值+字符串，默认会把数值先转化成字符串再连起来
如果是 字符串 - 数值 ，由于字符串不支持减法运算 ，所以会先把 字符串变成数值再进行 减法运算
```javascript
'123'+'456'
```
### 总结
尽量少用自增自减
不同类型不要加起来
## 比较运算符
>
<
>=
<=
== 等于/模糊等于
!= 不等/不模糊相等
=== 全等于
!== 不全等
JS 三位一体
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1637128438859-cefddbaa-8b80-4cb8-bc74-513bdfddfca2.png#clientId=u41163619-9f41-4&from=paste&height=352&id=u44c3d785&originHeight=704&originWidth=686&originalType=binary&ratio=1&size=234348&status=done&style=none&taskId=u40d26f1f-c776-4162-8760-df30999cd26&width=343)
```javascript
0 == []
0 == '0'
0 == '\t'
// 但是右边三个互不相等
```
要用 ===代替==，==会自动类型转换
**===**
基本类型看值是否相等
对象看地址是否相等
## 布尔运算符
### 或且非
||
&&
!
### 短路逻辑
console&&conosle.log&&console.log('hi') 
以防 console 不存在报错
防御性编程
```javascript
if(console){
	if(console.log){
  	console.log('hi')
  }
)
console&&console.log&&console.log('hi')
```
a =  a || 100
a的保底值
```javascript
if(!a){a=100}else{a=a}

function add(a=0){
	return n+1
}
// 输入 null 或 undefined 时a=0成立，return 1
// 输入 ''时，return ‘1’
```
## 二进制运算符
### 或、与、否
| 其中一个为1，则结果为1，否则为0
& 两个位都为 1, 则结果为1，否则为0
~ 求反
```javascript
(0b1111 | 0b1001).toString(2)
(0b1111 & 0b1001).toString(2)
```
### 异域
^
两个位都相同，则结果为 0，否则为 1
### 左移右移
<<和>>
头部补零的右移运算符
>>>
正数是与右移几乎没区别
```javascript
(0b0010 >> 1).toString(2) // 0001
(0b0010 << 1).toString(2) // 0100
(0b0011 >> 1).toString(2) // 0001
```
