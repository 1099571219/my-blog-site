---
title: JavaScript（二）对象分类
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-24
---
# JavaScript（二）对象分类
## 对象分类
### 写个正方形
**浪费内存的写法**
```javascript
let squareList = []
let widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
for (let i = 0; i < 12; i++) {
  squareList[i] = {
    width: widthList[i],
    getArea() {
      return this.width * this.width
    },
    getLength() {
      return this.width * 4
    }
  }
}
```
**浪费内存**
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636704640252-00111f21-ee69-48e8-b5a8-e4b10b67cc10.png#clientId=ua5685c73-c1ed-4&from=paste&height=358&id=u80fcc183&originHeight=716&originWidth=1069&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115409&status=done&style=none&taskId=ua65b1fa8-79fe-4d24-beb8-b9187f5551f&title=&width=534.5)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636704871523-e174f6ab-1845-4ba8-8d84-dc697067c007.png#clientId=ua5685c73-c1ed-4&from=paste&height=29&id=u83c6ff44&originHeight=57&originWidth=423&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4524&status=done&style=none&taskId=u4ebceae8-6cae-4c9b-a3c6-0fdd28f8082&title=&width=211.5)
**优化后的代码和内存图**
```javascript
let squareList=[]
let widthList = [5,6,5,6,5,6,5,6,5,6,5,6]
let squarePrototype ={
  getArea(){
    return this.width*this.width
  },
  getLength(){
    return this,width*4
  }
}
for(let i =0;i<12;i++){
  squareList[i] = Object.create(squarePrototype)
  squareList[i].width = widthList[i]
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636703814034-412d7e7e-450a-4bd9-8bb4-24d1db146047.png#clientId=ua5685c73-c1ed-4&from=paste&height=362&id=u5297435b&originHeight=724&originWidth=1487&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110380&status=done&style=none&taskId=u1a7f1836-7c34-4187-adfd-79bb821f40d&title=&width=743.5)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636704929739-33179e79-64ce-4795-a33f-25bf7a942fe3.png#clientId=ua5685c73-c1ed-4&from=paste&height=31&id=u8d4a4dde&originHeight=61&originWidth=421&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4474&status=done&style=none&taskId=u8f535dc3-f1de-46c4-9757-54ed2584071&title=&width=210.5)
### 抽离到函数
```javascript
let squareList = []
let widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
function createSquare(width) {
  let obj = Object.create(squarePrototype)
  obj['width'] = width
  return obj
}
let squarePrototype = {
  getArea() {
    return this.width * this.width
  },
  getLength() {
    return this.width * 4
  }
}
for (let i = 0; i < 12; i++) {
  squareList[i] = createSquare(widthList[i])
}
```
### 函数与原型的结合（几近完美）
```javascript
let squareList = []
let widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
function createSquare(width) {
  let obj = Object.create(createSquare.squarePrototype)
  obj['width'] = width
  return obj
}
createSquare.squarePrototype = {
  getArea() {
    return this.width * this.width
  },
  getLength() {
    return this.width * 4
  },
  constructor: createSquare
}
for (let i = 0; i < 12; i++) {
  squareList[i] = createSquare(widthList[i])
  console.log(squareList[i].constructor)
}
```
### new操作符
```javascript
let squareList = []
let widthList = [5, 6, 5, 6, 5, 6]
function Square(width) {
  this['width'] = width
}
Square.prototype.getArea = function () {
  return this.width * this.width
}
Square.prototype.getLength = function () {
  return this.width * 4
}
for (let i = 0; i < 6; i++) {
  squareList[i] = new Square(widthList[i])
  console.log(squareList[i].constructor)
}
```
#### 写个圆
```javascript
// 创建个圆
function Circle(radius) {
  this['radius'] = radius
}
Circle.prototype.getArea = function () {
  return this.radius * 2 * Math.PI
}
Circle.prototype.getLength = function () {
  return Math.pow(this.radius, 2) * Math.PI
}
let c1 = new Circle(5)
```
#### 写个矩形
```javascript
// 创建一个矩形
function Rect(width, height) {
  this.width = width
  this.height = height
}
Rect.prototype.getArea = function () {
  return this.width * this.height
}
Rect.prototype.getLength = function () {
  return (this.width + this.height) * 2
}

```
### 总结
#### new X() 自动做了四件事
自动创建空对象
自动为空对象关联原型，原型地址指定为 X.prototype
自动将空对象作为 this 关键字运行构造函数
自动return this
JS之父的爱
#### 构造函数X
X 函数本身负责给对象本身添加属性
X.prototype 对象负责保存对象的共用属性
#### 代码规范
#### 大小写
所有构造函数（专门用于创建对象的函数）首字母大写
所有没构造出来的对象，首字母小写
#### 词性
**new 后面的函数，使用名词形式**
如 new Person()、new Object()
**其他函数，一般用动词开头**
如 createSquare(5)、createElement('div)
**原型公式**
**对象.__proto__===其构造函数.prototype**
**x.原型 等价于 x.__proto__**

### 需要分类
### 理由
**理由一**
有很多对象拥有一样的属性和行为
需要把他们分为同一类
如 square1 和 square2
这样创建类似对象的时候就很方便
**理由二**
但是还有很多对象拥有其他的属性和行为
所以就需要不同的分类
比如 Square / Circle / Rect 就是不同的分类
Array / Function 也是不同的分类
而 Object 创建出来的对象，是最没有特点的对象
## 类型 V.S. 类
### 类型
类型是 JS 数据的分类，有7种
四基两空一对象
### 类
类是针对于对象的分类，有无数种
常见的有 Array、Function、Date、RegExp等
### 数组对象
#### 定义一个数组
```javascript
let arr = [1,2,3]
let arr = new Array(1,2,3)
let arr = new Array(3) //长度为3
```
#### 数组对象自身属性
'0' / '1' / '2' / 'length'
属性没有数字，只有字符串
#### 数组对象的共用属性
'push'/'pop'/'shift'/'unshift'/'join'/'concat'
### 函数对象
#### 定义函数
```javascript
function fn(x,y){return x+y}
let fn2 = function fn(x,y){return x+y}
let fn = (x,y) =>x+y
let fn = new Function('x','y','return x+y')
```
#### 函数对象自身属性
'name'/'length'
#### 函数对象共用属性
'call'/'apply'/'bind'
### JS 终极一问
x.原型 等价于 x.__proto__
**window 是谁构造的**
Window
可以通过constructor 属性查看构造者
**window.Object 是谁构造的**
window.Function
因为所有的函数都是 window.Function 构造的
**window.Function 是谁构造的**
window.Function
因为所有函数都是 window.Function 构造的
并不是自己构造自己，这是开发者的安排
浏览器构造了 Function,然后指定它的构造者是自己
### 用类构造函数
用类创造一个对象
constructor内部是对象
外部是函数
```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  hello() {
    console.log('你好，我叫' + this.name)
  }
}

let person = new Person('luca', 18)
person.name === 'luca' // true
person.age === 18 // true
person.hello() 
```
## JS数组对象
**JS的数组不是典型数组**
**典型的数组**
元素的数据类型相同
使用连续的内存存储
通过数字下标获取元素
**但 JS 的数组不这样**
元素的数据类型可以不同
内存不一定是连续的（对线是随机存储的）
不能通过数字下表，而是通过字符串下标
这意味着数组可以有任何key
比如
```javascript
let arr =[1,2,3]
arr['xxx']=1
```
### 创建一个数组
#### 新建
```javascript
let arr =[1,2,3]
let arr = new Array(1,2,3)
let arr = new Array(3)
```
#### 转化
```javascript
let arr ='1,2,3'.split(',')
let arr = '123'.split('')
Array.from('123')
Array.from({0:'a',1:'b',2:'c',3:'d',length:2}) 只要有0123下标跟length
```
#### 伪数组
```javascript
let divList = document.querySelectorall('div')
let divArray = Array.from(divList)
console.dir(divArray)
```
Array.from()把普通对象变成数组
伪数组的原型链中并没有数组的原型
### 创建一个连续数组（连接）
**合并两个数组，得到新数组**
```javascript
let arr3=arr1.concat(arr2)
只提供浅拷贝
```
截取一个数组的一部分
```javascript
arr5 =[3, 3, 3, 4, 4, 4, 4]
arr5.slice(3) //从第四个元素开始取
[4, 4, 4, 4]
arr5.slice(0) //全部截取
JS只提供浅拷贝
```
### 增删改查
#### 删
**跟对象一样**
数组的长度并没有变（稀疏数组）
```javascript
let arr =['a','b','c']
delete arr['0']
// [empty, 'b', 'c']
```
**不要随便改length 会删元素**
```javascript
let arr =[1,2,3,4,5,6]
arr.length = 3
//[1, 2, 3]
```
**正确删元素**
删除头部元素
```javascript
arr.shift() //返回删除值
```
删除尾部元素
```javascript
arr.pop() //返回删除值
```
删除中间的元素
```javascript
arr.splice(index,1)  //删除 index开始 的一个元素
arr.splice(index,1,'x') //在删除的位置添加'x'
arr.splice(index,1,'x','y') //在删除的位置添加'x','y'
```
#### 查看所有元素
**查看所有属性名**
```javascript
let arr = [1,2,3,4,5];arr.x='xxx'
Object.keys(arr)
for(let key in arr){console.log(`${key}:${arr[key]}`)}
```
**查看数字（字符串）属性名和值**
要自己让i 从0增长到 length-1
```javascript
for(let i =0;i<arr.length;i++){
  console.log(`${i}:${arr[i]}`)
}
```
也可以用forEach / map 等原型上的函数
```javascript
arr.forEach(function(item,index,array){
  console.log(`${index}:${item} ${array}`)
})

function forEach(array,fn){
  for(let i = 0;i<array.length; i++){
    fn(array[i],i,array)
  }
}// forEach 用for访问 array 的每一项
对每一项调用 fn(array[i],i,array)
传入array不用管
```
 两者区别是
for循环可以使用break 和continue
for 是关键字不是函数
**查看单个属性**
跟对象一样
```javascript
let arr=[1,2,3]
arr[0]
```
**索引越界**
**报错：Cannot read property 'toString' of undefined**
** x.toString() 其中x如果是undefined 就报这个错**
```javascript
arr[arr.length] === undefined
arr[-1] === undefined

```
**查找某个元素是否在数组里**
```javascript
arr.indexOf(item) //存在则返回索引值，否则返回-1
```
**使用条件查找元素**
```javascript
arr.find(function(x){
	return x%2 ===0
}) // 找第一个偶数

arr.find(x=>item%2===0)
```
**使用条件查找元素索引**
```javascript
arr.findIndex(function(x){
  return x%2===0
}) //找第一个偶数的索引

arr.findIndex(
  x=>x%2===0
)
```
#### 增加数组中的元素
**在尾部添加元素**
```javascript
arr.push(new) // 修改后返回新长度
arr.push(new1,new2)
```
**在头部添加元素**
```javascript
arr.unshift(new) //在头部添加一个元素 返回新长度
arr.unshift(new1,new2,new3)
```
**在中间添加元素**
```javascript
arr.splice(index,0,'x') //在 index 处插入 'x' 原来index位置的元素往后移
arr.splice(index,0,'x','y','z')
```
#### 修改数组中元素的顺序
**反转顺序**
```javascript
let s= 'abcde'
s=s.split('').reverse().join('')
```
**自定义顺序**
```javascript
arr.sort((a,b)=>a-b)
```
### 数组变换
**map**
n变n
```javascript
arr.map(item=>item*item) //每个键值变成平方
```
**filter**
n变少
```javascript
arr.filter(item=>item%2==0 ? true:false) //留下偶数
arr.filter(item=>item%2==0)
```
**reduce**
n变1
得到一个结果
```javascript
arr.reduce((sum,item)=>{
   return sum+item	//return值 作为下一次的结果
},0)
arr.reduce((result,item)=>{
    return result.concat(item*item)
},[])
let arr = [1, 2, 3, 4, 5, 6]
arr.reduce((result, item) => {
    return result.concat(item % 2 === 0 ? item : [])
}, [])
```
```javascript
let arr = [
    { 名称: '动物', id: 1, parent: null },
    { 名称: '狗', id: 2, parent: 1 },
    { 名称: '猫', id: 3, parent: 1 }
]
arr.reduce((result, item) => {
    if (item.parent === null) {
        result.id = item.id
        result.名称 = item.名称
    } else {
        delete item.parent
        result.children.push(item)
        item.children = null
    }
    return result
}, { id: null, 名称: null, children: [] })
```
## JS函数对象
### 定义一个函数
**具体名称函数**
```javascript
function 函数名(形式参数1，形式参数2){
	语句
  return 返回值
}
```
**匿名函数**
具名函数去掉函数名就是匿名函数
=右边的叫函数表达式
```javascript
let a = function(x,y){return x+y}
```
如果是在=右边声明的函数，能作用的范围也只有等号右边
### 箭头函数
```javascript
let f1 = x => x*x
let f2 = (x,y) => x+y // 圆括号不能省
let f3 = (x,y) => {return x+y} //花括号不能省,return 也不能省
let f4 = (x,y) => ({name:x,age:y}) //直接返回对象会出错，需要加个圆括号
```
### 函数调用
```javascript
let fn = () => console.log('hi')
fn()
有圆括号才能调用
```
**再进一步**
```javascript
let fn = () => console.log('hi')
let fn2 = fn
fn2()
```
fn 保存了匿名函数的地址
这个地址被复制给了 fn2
fn2() 调用了匿名函数
fn 和 fn2 都是匿名函数的引用而已
真正的函数既不是 fn 也不是 fn2
### 函数的要素
#### 调用时机
```javascript
let i = 0
for(i = 0; i<6; i++){
  setTimeout(()=>{
    console.log(i)
  },0)
}
```
结果打出6个6
```javascript
for(let i = 0; i<6; i++){
  setTimeout(()=>{
    console.log(i)
  },0)
}
```
结果：0、1、2、3、4、5
#### 作用域
```javascript
function fn(){
  let a = 1
  }
fn()
console.log(a) // a 还是不存在的
```
#### 全局变量 。局部变量
在顶级作用域声明的变量是全局变量
window 的属性是全局变量
其他都是局部变量
```javascript
let b =2
function f1() {
  window.a = 1
  let c = 3
  }
f1()
function f2() {
  console.log(a)
  console.log(b)
  console.log(c)
}
f2()
// 只能打印出a
```
```javascript
function f1() {
  let a = 1
  function f2() {
    let a = 2
    console.log(a)
  }
  console.log(a)
  a = 3
  f2()
}
f1() //打印出 1 2
```
**作用域规则**
如果多个作用域有同名变量 a
那么查找 a 的声明时，就向上取最近的作用域
简称就近原则
查找 a 的过程与函数执行无关
但 a 的值与函数执行有关
```javascript
function f1() {
  let a = 1
  function f2() {
    let a = 2
    function f3() {
      console.log(a)
    }
    a = 22
    f3()
  }
  console.log(a)
  a = 100
  f2()
}
f1()
```
#### 闭包
如果一个函数用到了外部的变量 
那么这个函数加这个变量
就叫做闭包
f2()里面的 a 和 f3() 组成了闭包
**缺点：**
在IE中使用闭包有 bug，IE 在我们使用完闭包之后，依然回收不了闭包里面引用的变量，最终造成内存泄露
#### 形式参数
形式参数的意思就是非实际参数
x 和 y 就是形参，因为并不是实际的参数
调用 add 时，1 和 2 是实际参数，会被赋值给 x y
如果add（）其中放着对象，则会复制对象内存地址给x y
```javascript
function add(x, y) {
    return x + y
}
等价于
function add(){
  var x = arguments[0]
  var y = arguments[1]
  return x+y
}
//add(1, 2)
```
**形式参数可多可少**
```javascript
function add(x) {
    return x + arguments[1]
}
add(1, 2)
```
#### 返回值
每个参数都有返回值
```javascript
function hi() {
    console.log('hi')
}
hi()
```
没写return，所以返回值是undefined
```javascript
function hi() {
    return console.log('hi')
}
hi() 
```
返回值为 console.log('hi')的值，undefined
**函数执行完了后才会返回**
只有函数有返回值
1+2 的值为3，返回值为undefined
#### 调用栈
压栈与弹栈
JS 引擎在调用（进入）一个函数前
需要把函数所在的环境 push 到一个数组里
这个数组级啊欧总调用栈
等函数执行完了，就会把环境弹 ( pop ) 出来
然后 return 到之前的环境，继续执行后续代码
#### 递归函数
阶乘
```javascript
function f(n){
  return n!==1 ? n*f(n-1):1
}
```
理解递归
先递进，在回归
```javascript
f(4)
  =4 * f(3)
  =4 * (3 * f(2))
  =4 * (3 * (2 * f(1)))
  =4 * (3 * (2 * (1)))
  =4 * (3 * (2))
  =4 * (6)
24
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/23100954/1636966957123-51a407cd-d615-4179-81cf-0dcafe428072.png#clientId=uc9fc4619-d682-4&from=paste&height=446&id=uffc128b6&originHeight=892&originWidth=1917&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136642&status=done&style=none&taskId=ueefe5fe7-d52d-482a-ac6e-c3ecb5aaf73&title=&width=958.5)
**爆栈**
如果调用栈中压入的帧过多，程序就会崩溃
#### 函数提升
**什么是函数提升**
```javascript
function fn(){}
```
不管把具名函数声明在哪里，他都会跑到第一行
**什么不是函数提升**
```javascript
let fn = function(){}
```
这是赋值，右边的匿名函数声明不会提前 	
### arguments 和 this
```javascript
function fn(){
	console.log(arguments)
  console.log(this)
}
```
**如何传 arguments**
调用fn 即可传 arguments
fn(1,2,3) 那么 arguments 就是 [1,2,3] ,伪数组，没有数组的共有属性
**如何传 this**
目前可以用 fn.call(xxx,1,2,3) 传 this 和 arguments
而且 xxx 会被自动转化成对象（JS的糟粕），后面的则会被转换成伪数组
 函数中如果不给条件，this 默认指向window
如果函数里不加 'use strict' this 会尽量把你传的东西变成对象
**JS 在每个函数里加了 this**
用this 获取那个未知的对象
```javascript
let person = {
  name:'frank',
  sayHi(){
    console.log('你好，我叫' + this.name)
  }
}
person.sayHi()
//相当于
person.sayHi(person)
然后 person 被传给 this 了（person 是个地址）
这样每个函数都能用 this 获取一个未知对象的引用了
```
person.sayHi()
会隐藏式的把 person 作为 this 传给 sayHi
方便sayHi 获取 person 对应的对象
#### 总结
**想让函数获取对象的引用**
**但是并不想通过变量名做到**
**Python 通过额外的 self 参数做到**
**JS 通过额外的 this 做到：**
person.sayHi() 会把 person 自动传给 sayHi,sayHi 可以通过 this 引用 person
**其他**
注意 person.sayHi 和 person.say Hi() 的区别
注意 person.sayHi() 的断句 (person,sayHi)()
**两种调用**
小白调用法
会自动把 person 传到函数里，作为this
```javascript
person.sayHi()
```
大师调用法
需要自己手动把 person 传到函数里，作为this
```javascript
person.sayHi.call(person)
```
从这开始用第二种调用法
```javascript
function add(x, y) {
    return x + y
}
add.call(undefined, 1, 2)
```
上面没有用到 this
为什么要多些一个 undefined
因为第一个参数要作为 this
但是代码里没有 this
所以只能用 undefined 占位
null 也可以
#### this 的两种传递方法
**隐藏式传递**
```javascript
fn(1,2) 等价于 fn.call(undefined,1,2)
obj.child.fn(1) 等价于 obj.child.fn.call(obj.child,1)
```
**显示传递**
**apply的用法就是给形式参数加上[]**
```javascript
fn.call(undefined,1,2)
fn.apply(undefined,[1,2])
```
#### 绑定 this
**使用 .bind 可以让 this 不被改变**
```javascript
function f1(p1,p2){
	console.log(this,p1,p2)
}
let f2 = f1.bind({name:'lucas'})
//那么 f2 就是 f1 绑定了 this 之后的新函数
f2() 等价于 f1.call({name:'lucas'})
```
**.bind 还可以绑定其他参数**
```javascript
let f3 = f1.bind({name:'lucas'},'hi')
f3() 等价于 f1.call({name:'lucas'},hi)
```
```javascript
let lucasPhone = {
  name: "lucas",
  phoneBattery: 40,
  // 充多少(num)电
  charge(num) {
    console.log(this)
    this.phoneBattery = num
    console.log(this)
  }
}
// lucasPhone.charge.call(lucasPhone, 60)
// lucasPhone.charge.apply(lucasPhone, [60])
let bobPhone = {
  name: "bob",
  phoneBattery: 20
}
let bobPhoneBatteryCharge = lucasPhone.charge.bind(bobPhone, 100) //提前绑参 100
bobPhoneBatteryCharge()
// lucasPhone.charge.call(bobPhone, 100)
// lucasPhone.charge.apply(bobPhone, [100])
```
#### 箭头函数
**里面的 this 就是外面的 this**
```javascript
console.log(this)  // window
let fn = () => console.log(this)
fn() // window
```
就算加了 call 也一样,无法用call传递 this
```javascript
fn.call({name:'lucas'}) // window
let person = {
  "name": "lucas",
  sayHi: () => {
    console.log("你好" + this.name)
    console.log(this)
  }
}
person.sayHi.call(person) //this === window

```
### 立即执行函数
**原理**
ES 5时代，为了得到局部变量， 必须引入一个函数
但是这个函数如果有名字，就没用了
于是这个函数必须是匿名函数
声明匿名函数，然后立即加个() 执行它
但是JS 标准认为这种语法不合法
所以JS 程序员寻求各种办法
最终发现，只要在匿名函数前面加个运算符即可
!、~、()、+。- 都可以
但是这里面有些运算符会往上走
所以推荐用！来解决

