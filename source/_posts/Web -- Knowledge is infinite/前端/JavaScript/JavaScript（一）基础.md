---
title: JavaScript（一）基础
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-24
---
# JavaScript（一）基础
## 语法
### 表达式
1 + 2 表达式的值为3
add(1,2) 表达式的值为函数的返回值 （只有函数有返回值）
console.log 表达式的值为函数本身
console.log(3) 表达式的值为多少？ undefined
console.log(3)打印出来的是3  但它的值是 undefined 也是返回值
### 语句
var a=1 是一个语句
### 二者的区别
表达式一般都有值，语句可能也有也可能没有
语句一般会改变环境（声明、赋值）
上两句话不是绝对的

---

### 大小写敏感
#### 不要写错
var a 和 var A 是不同的
object 和 Object 是不同的
fuction 和 Function 是不同的
具体含义看后文

---

### 空格
#### 大部分空格没有实际意义
var a -1 和 var a=1 没有区别
加回车大部分时候也不影响
只有一个地方不能加回车，那就是 return 后面

---

### 标识符
#### 规则
第一个字符，可以是Unicode 字母或$ 或_或中文
后面的字符，除了上面所说，还可以有数字
Uncaught Synt axError: Invalid or unexpected token（token字符串）
#### 变量名是标识符
```javascript
var _=1
var $ =2
var _________=5
var 你好 ='hi'
```

---

### 注释的分类
#### 不好的注释
把代码翻译成中文
过时的注释
发泄不满的注释
#### 好的注释（我为什么要这么写）
重要的内容写注释
踩坑注释
为什么代码写的这么奇怪，遇到哪些bug

---

## 判断语句
### if语句
#### 语法
{} 在语句只有一句的时候可以省略，不建议这样做
```javascript
if(表达式){
  语句1
} else {
  语句2
}
```
#### 变态情况
表达式里可以非常变态，如 a = 1
语句1里可以非常变态，如嵌套的 if else
语句2里也可以非常变态，如嵌套的 if else
缩进也可以很变态，如面试题常常下套
```javascript
a = 1
if(a===2)
  console.log('a')
	console.log('a等于2')
最后会打印一个a等于2
```
if 表达式成立后如果没有花括号默认只执行第一个语句console.log('a')，如果不成立就直接跳过第一句执行外面的也就是下面的代码，如果写在一行用分号隔开一样只执行第一句，分号表示语句结束了，如果是同一行用逗号隔开，则表示语句还没结束继续执行

---

#### 永远使用最没有歧义的写法
#### 最推荐的写法
```javascript
if (表达式) {
  语句
}else if (表达式) {
  语句
}else{
  语句
}
```
#### 次推荐的写法
```javascript
function fn(){
  if (表达式) {
    return 表达式
  }
  if (表达式) {
    return 表达式
  }
  return 表达式
}
```

---

### switch 语句
#### 语法
```javascript
switch （fruit）{
  case "banana":
    //...
    break;
  case "apple":
    //.......
    break;
  default:
    //......
}
```
#### break
大部分时候，省略 break 你就完了
少部分时候，可以利用 break

---

### 问好冒号表达式
表达式1？表达式2：表达式3
```javascript
function max(a,b){return a>b ? a : b}
max(1,2)
2
```

---

### &&短路逻辑
A && B && C && D 取第一个假值或D，并不会取true / false
如果&&前面为真值就会求后面的值，如果&&前面试假那么就不看后面
&&是且运算符
```javascript
window.ai && console.log('a1存在')
等价于
if(window.a1){
  console.log('a1存在')
}
console && console.log && console.log('hi')
打印hi
IE没有 console
```

---

### ||短路逻辑
A || B || C || D
跟&&短路逻辑相反
|| 是或运算符
```javascript
if (!a){
  b
}
a||b

if (a){
  a=a
}else{
  a=100 //保底值
}
a=a ||100
window.a=window.a ||100

```

---

## 循环语句
### while 循环
#### 语法
while (表达式) { 语句 }
判断表达式的真假
当表达式为真，执行语句，执行完再判断表达式	的真假
当表达式为假，执行后面的语句
```javascript
var i = 0	//初始化
while (i < 10) {	//判断
  console.log(i)	//循环体
  i = i + 1	//增长
}
```
#### 变态情况
```javascript
var a=0.1 
while(a !==1){ 
	console.log(a) 
  a = a + 0.1	
}
死循环原因是浮点数不精确无法加到1
```

---

### for 循环
#### 语法糖
for 是 while 循环的方便写法
#### 语法
先执行语句1
然后判断表达式2
如果为真，执行循环体，然后执行语句3
如果为假，直接退出循环，执行后面的语句
```javascript
for(语句1；语句2；语句3) {
  循环体
}
```
#### 变态情况
setTimeout意思是过一会儿在做setTimeout以及里面的内容，等现在循环做完了再做打印
把语句1的var 改成 let 就能避免计时器产生的部分作用
```javascript
for(var i = 0; i<5; i++){
  setTimeout(()=>{
    console.log(i)
  },0)
  console.log(i)
}
打印结果
0
1
2
3
4
5
5
5
5
5
把var 换成let
for(let i = 0; i<5; i++){
  setTimeout(()=>{
    console.log(i)
  },0)
  console.log(i+'d')
}
打印结果
0d
1d
2d
3d
4d
0
1
2
3
4
```

---

### break 和 continue
拖出所有循环 v.s. 退出当前一次循环
break 只会退出离它最近的for
```javascript
for(var i=0;i<10;i++){
    if(i%2===1){
        break
    }else{
    	console.log(i)
    }
}
打印
0
for(var i=0;i<10;i++){
    if(i%2===1){
        continue
    }else{
    	console.log(i)
    }
}
打印
0
2
4
6
8
```

---

### label 语句（重）
#### 语法
```javascript
foo: {
  console.log(1);
  break foo;
  console.log('本行不会输出');
}
console.log(2);
```
#### 变态情况问
```javascript
{
foo:1
}
```
上面的东西是什么
**  foo是一个label，语句是1**

---

## 数据类型

### 数字与字符串
**都是一，为什么要分1和'1'**
#### 功能不同
数字是数字，字符串是字符串，要严谨区分
数字能加减乘除，字符串不行
字符串能表示电话号码，数字不行
#### 存储形式不同
JS中，数字是用64位浮点数的形式存储的
JS中，字符串是用类似 UTF8 形式存储的 （USC-2）
#### 如何存储数字
十进制转二进制即可
**二进制**
**10转2**
```javascript
31 变成二进制 31=？X 2^5 + ? X 2^4 + ? X 2^3 + ? X 2^2 + ? X 2^1 + ? X 2^0
31=0 X 2^5 + 1  X 2^4 + 1 X 2^3 + 1 X 2^2 + 1 X 2^1 + 1 X 2^0
```
**2转10**
**100011 变成十进制**
**每一位乘以 2 的 N 次方，然后加起来即可**
```javascript
100011 = 2^5 + 2^1 + 2^0 =35
```
**用十六进制表示二进制**
011110001011010
记住8 4 2 1 对应 X X X X
从右往左每四位改写成一位： 011 1111 0101 1010
得到 3 F 5 A，也可以用计算器的程序员模式
HEX 表示 16 进制，BIN 表示 2 进制
OCT 表示 8 进制，DEC 表示 10 进制
#### 如何存储字符
转换成数字
但是'1'不能用1来表示
**用 0~127 表示所有符号**
0表示结束字符
10表示换行
13表示回车
32表示空格
33-47表示标点符号
48-57表示数字符号
65-90表示大写字母
97-122表示小写字母
127表示删除
 ![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636615741971-d21dea9c-23e5-41ff-8061-0cdde2a218f6.png#clientId=u38297ead-0041-4&from=paste&height=506&id=u91ca0ebd&originHeight=1011&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=777775&status=done&style=none&taskId=u88513ba0-5e06-414c-bacd-08cb625debf&title=&width=493)
**GB2312**
用0000 ~ FFFF 表示汉字
FFFF就是4 X 4 = 16位，就是2个字节
最多收录2^16 =65536个字符
但只收录了6000多汉字。西文字母和日文假名
**GBK 国标扩(微软）**
含21886个汉字和图形符号
收录了中日韩使用的几乎所有汉字
完全兼容GB2312
依然使用16位 （两字节）
后来国标局退出 GB18030 取代 GBK
GB18030 不兼容 GB2312
**Unicode 万国码**
**优点**
已收录13万字符（大于16位），全世界通用
以后还会补充，不会停止
最新版只添加了一个字——令和的合体字
**缺点**
两个字节不够用，每个字符要用三个及以上的字节
那这样所有文件都扩大50%，不划算
**所以有了UTF - 8,偷懒存储法**
### JS数据类型
#### 7种数据类型
数字 number
字符串 string
布尔 bool
符号 symbol
空 undefined
空 null
对象 object
总结：四基两空一对象
**以下不是数据类型**
数组、函数、日期
它们都属于 object
#### 数字 number
由64位浮点数组成
**写法**
```javascript
整数写法
1
小数写法
0.1
科学计数法
1.23e3 等于1.23 * 10^3
八进制写法
0123 或 00123 或 0o123
十六进制写法
0x3F 或 0X3F
二进制写法
0b22 或 0B11
```
**特殊值**
**正0 和 负0**
都等于 0
```javascript
1/-0 = -infinity
```
**无穷大**
Infinity、+Infinity、-Infinity
**无法表示的数字**
NaN ( Not a Number) 无法表示的一个数字
但它是一个数字，比如
```javascript
0/0结果是NaN
```
**64位浮点数**
**JS数字的存储形式**
浮点就是浮动的点，意思就是小数点会乱动
123.456 可以表示为 1.23456e10^2
也可以表示为12345.6e10^-2
**64位存储一个 number**
符号占 1 位 （0正 1负）
指数占 11 位（-1023~-1024）
有效数字占 52 位（开头的1省略）
**范围和精度**
**范围（忽略符号位）**
**指数拉满、有效数字拉满、得到最大二进制数字**
```javascript
Number.MAX_VALUE:1.7976931348623157e+3083
```
指数负方向拉满、有效数字最小1，得到最小值
```javascript
Number.MIN_VALUE：5e-324
```
**精度（有效数字）**
最多只能到53个二进制位表示有效数字
2^53 对应的十进制是9 后面15个零
所以15位有效数字都能精确表示
16位有效数字如果小于90开头，也能精确表示
9100000000000001 就存不下来
#### 字符串 string
每个字符两个字节
**写法**
```javascript
单引号
'hello'
双引号
"hello"
反引号
`hello`
```
**注意**
引号不属于字符串的一部分。就像书名一样
**转义**
**错误写法**
```javascript
'it's ok'
JS 引擎会认为'it'就结束了，后面的看不懂
```
**正确写法**
```javascript
'it\'s ok'  这就是转义
"it's ok"
`it's ok`
```
**用另一种写法表示你想要的东西**
```javascript
\' 表示'
\" 表示"
\n 表示换行
\r 表示回车
\t 表示tab 制表符
\\ 表示\
\uFFFF 表示对应的 Unicode 字符
\xFF 表示前 256 个 Unicode 字符
```
**多行字符串**
**如果想在字符串里回车用反引号包住语句就行了**
```javascript
let s = `大家好
大家好
大家好`
```
**字符串的属性**
**待填、、**
**字符串的长度**
string.length
```javascript
'123'.length // 3
'\n\r\t'.length // 3
'\\\\\\'.length // 3
''.length // 0
' '.length // 1
```
**通过下标读取字符**
**string[index]**
**index 从0 开始**
**index 到 length -1**
```javascript
let s = 'hello';
s[0] // 'h'
s[5] // undefined,没报错
s[4] // 'o'
```
**base64 转码**
**一般用来隐藏招聘启事里的简历**
邮箱:MTIzNDU2Nzg5MEBxcS5jb20=
**有时候也用来自欺欺人**
所谓的加密，也就是骗过一些外行
```javascript
window.btoa
正常字符串转为 Base64 编码的字符串
window.atob
Base64 编码的字符串转为原来的字符串
```

#### 布尔 bool
只有两个值
true 和 false
**下列运算会得到 bool 值**
```javascript
否定运算
!value
相等运算
1==2、1!-=2 、 3 ===4、3!==4
比较运算
1>2、1>=2、1<2、1<=2
```
**if 配 bool**
**if 语句经常需要判断真假**
如果 value 不是 bool 值，孰真孰假
```javascript
if(value){
	..
}else{
  ..
}
```
**JS 有五个 falsy 值**
falsy 就是相当于false 但又不是false 的值,除此之外都是真值
**分别是**
```javascript
undefined
null
0
NaN
''
```
#### undefined 和 null 两种空值类型
**区别**
没有本质的区别
一、如果一个变量声明了但没赋值，那默认值就是undefiend，而不是null
二、如果一个函数，没写return，那么默认 return undefined，而不是 null
三、习惯上把非对象的控制写为 undefined,把对象的空值写为null
### JS变量声明
#### 三种声明方式
```javascript
var a=1
let a=1
const a=1
```
**区别**
var 是过时的、不好用的方式
let 是新的、更合理的方式，用于声明变量
const 是声明时必须赋值，且不能再次改变的方式，通常用于声明常量
#### let 声明
**规则**
遵循块作用域，即使用范围不能超出{}
同一个块内不能重复声明
可以赋值，也可以不赋值
必须先声明再使用，否则报错
全局声明的 let 变量，不会变成 window 的属性
for 循环配合 let 有奇效
```javascript
{
    let b =1
    console.log(b)
}
console.log(b)
//error:b is not defined
 for (var i=0;i<5;i++){
    setTimeout(()=>console.log(i),0)
 }
// 5 5 5 5 5
 for (let i=0;i<5;i++){
    setTimeout(()=>console.log(i),0)
 }
// 0 1 2 3 4
```
#### conset 声明
**规则**
 跟let 几乎一样
只有一条不一样：声明时就要赋值，赋值后不能改
#### 变量声明
指定了值 同时也指定了类型、但是值和类型都可以随意变化
```javascript
var a=1
a=2
a='字符串'
```
#### name 和 'name'的区别
**name 是变量**
值可变，可能是'name' ，也可能是'hello'
**'name'是字符串常量**
常量就是不变量
'name' 只能是'name'，不能是其他的值
### 类型转换
#### number 转 string
```javascript
String(n)
n + '' 更方便
\\ 'n'
```
#### string 转 number
```javascript
Number(s)
parseInt(s)/parseFloat(s)
s-0
+s
```
#### x 转 bool
```javascript
Boolean(x)
!!x
```
#### x 转 string
```javascript
String(x)
x.toString()
```
## JS 对象 object
**对象**
**定义**
无序的数据集合
键值对的集合
### 写法
```javascript
let obj = {'name':'frank','age':18}
let obj = new Object({'name':'frank'})
console.log({'name':'frank','age':18})
```
**细节**
键名是字符串，不是标识符，可以包含任意字符
引号可省略，省略之后就只能写标识符
**就算引号省略了，键名也还是字符串，没有数字键名，没有数字下标**
### 属性
每个 **key **都是对象的**属性名**
每个 **value **都是对象的**属性值**
**Object.keys(obj) 可以得到 obj 的所有 key**
### 奇怪的属性名
**所有属性名会自动变成字符串**
```javascript
let obj = {
  1:'a',
  2.1:'b',
  1e2:true,
  1e-2:true,
  .123:true,
  0xFF:true
};
Object.keys(obj)
// ['1','100','255','2.1','0.0.1','0.123'
```
### 变量作属性名
```javascript
let a =2222
let obj = {a:1111} 这样写属性名为'a'
let obj = ([a]:1111) 属性名为'2222'
var obj = {[1+2+3+4]:10}  键名会先求值然后再转换成字符串
```
key想写变量就在外面加方框
**对比**
不加 [] 的属性名会自动变成字符串
加了 [] 则会当做变量求值
值如果不是字符串，则会自动变成字符串
### 对象的隐藏属性
**隐藏属性**
JS 中的每一个对象都有一个隐藏属性
这个隐藏属性储存着其共有属性组成的对象的地址
这个共有属性组成的对象叫做原型
也就是说，隐藏属性储存着原型的地址
**代码示例**
```javascript
var obj ={}
obj.toString() // 不报错
因为 obj 的隐藏属性对应的对象上有 toString()
```
**超纲知识**
**除了字符串，symbol 也能做属性名**
```javascript
let a=Symbol()
let obj ={[a]:'Hello'}
```
在学习迭代时会用到
### 增删改查
#### 删除属性
```javascript
delete obj.xxx
delete obj['xxx']
```
即可删除 obj 的 xxx 属性
请区分 属性值为 undefined 和不含属性名
**不含属性名**
```javascript
'xxx' in obj === false
```
**含有属性名，但值为undefined**
```javascript
'xxx' in obj && obj.xxx ===undefined
```
要判断属性名是否在对象里面只能用 '属性名' in 对象
**注意 obj.xxx ===undefined**
**不能断定'xxx'是否为 obj 的属性**
#### 查看属性（读属性）
**查看自身所有属性**
```javascript
Object.keys(obj)
Object.values(obj)
```
**查看自身+共有属性**
```javascript
console.dir(obj)
```
**判断一个属性是自身的还是共有的**
```javascript
obj.hasOwnPropertys('toString')
```
**两种方法查看属性（单独）**
```javascript
obj['key'] 中括号语法
obj.key 点语法
obj[key] // 变量key 值一般不为'key'
```
**优先使用中括号语法**
点语法会误导，以为 key 不是字符串
等确定不会弄混两种语法，再改用点语法
#### 修改或增加属性（写属性）
**直接赋值**
```javascript
let obj = {name:'luca',age:15}
obj['name'] = 'lucas'
obj.name = 'lucas'
obj['age'] = '22'
obj['na'+'me'] = 'lucas'
let key = 'name';obj[key] = 'lucas'
```
**批量赋值**
```javascript
Object.assign(obj,{gender:'男',game:'LOL、WOW'})
```
#### 修改或增加共有属性
**无法通过自身修改或增加共有属性**
```javascript
let obj = {},obj2={}
obj.toString = 'xxx' 只会改在自身属性
obj2.toString 还是在原型上
```
**偏要修改或增加原型上的属性**
一般来说，不要修改原型，会引起很多问题
```javascript
obj.__proto__.toString =  'yyy'
Object.prototype.toString = 'yyy'
```
#### 修改隐藏属性地址
**不推荐用__proto__**
```javascript
let obj = {name:'bob'}
let obj2 = {name:'jack'}
let common = {kind:'human'}
obj.__proto__ = common
obj2.__proto__= common
```
**推荐使用 Object,create**
**规范的是，要改就一开始改，别后来再改**
```javascript
let common = {kind:'human'}
let obj = Object.create(common)
Object.assign(obj,{name:'lucas',age:'22',gender:'男',game:'LOl'})
```
#### 增删改查总结
**删**
```javascript
delete obj['name']
'name' in obj  // fasle
obj.hasOwnProperty('name')  //false
```
**查**
```javascript
Object.keys(obj)
Object.values(obj)
console.dir(obj)
obj['name']
obj.name  这里的name是字符串
obj[name] 这里的name是变量
```
**改**
```javascript
obj['name']='jack'
Object.assign(obj,{1:'1',...})
改共有属性
obj.__proto__['toString']='xxx'
Object.prototype['toString']='xxx'
改原型
obj.__proto__ = common
let obj = Object.create(common)
所有的__proto__代码都是不建议写的
```
**曾**
跟改基本一样，已有属性改，没有属性则增

### 原型
**每个对象都有原型**
原型里存着对象的共有属性
比如 obj 的原型就是一个对象
obj.__proto__则存着这个对象的地址
这个对象里有 toString / constructor / valueOf 等属性
**对象的原型也是对象**
所以对象的原型也有原型
obj = {} 的原型即为所有对象的原型
这个原型包含所有对象的共有属性，是对象的根
这个原型也有原型，是null
**三段论：每个对象都有原型，对象的原型也是对象，所以对象的原型也有原型**
**原型为null的原型就是对象的根**
```javascript
obj.__proto__.__proto__
'__proto__' in obj.__proto__
```


