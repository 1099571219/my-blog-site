---
title: 异步与 Promise
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-24
---
# 异步与 Promise

**即 JS 异步编程模型**

## 异步与同步

### 如果能直接拿到结果就是同步

比如在医院挂号，你拿到号才会离开窗口
同步任务可能消耗时间长，也可能短
总之**不拿到结果是不会离开的**

### 如果不能直接拿到结果就是异步

比如在餐厅门口等位，拿到号可以**先去**逛街
什么时候才能吃到饭？
你可以**每 10 分钟**去餐厅问一下（**轮询**）
你也可以扫码用微信小程序**接收通知**（**回调**）

### 异步举例

#### 以 AJAX 为例

request.send() 之后，并不能直接得到 response
不信可以使用 console.log(request.response) 测试
必须等到 readyState 变为 4 后，浏览器**回**头**调**用 request.onreadystatechange 函数
才能得到 request.response （完整的）
这跟餐厅发送微信提醒的过程类似

#### 回调 callback

写给自己用的函数，不是回调
写给别人用的函数，就是回调
request.onreadystatechange 就是我写给浏览器调用的
意思就是让浏览器回头调一下这个函数
这里的“回头”指的是将来的意思
**写了却不调用，给别人调用的函数，就是回调**

#### 回调举例

\*\* \*\*把函数 1 给另一个函数 2

```javascript
function f1() {}
function f2(fn) {
  fn();
}
f2(f1);
```

这里我创建了 f1 但并没有调用 f1
我把 f1 传给了 f2 (别人)
f2 调用 f1 了
f1 是我写给 f2 调用的函数
所以 f1 是回调

```javascript
function f1(x) {
  console.log(x);
}
function f2(fn) {
  fn("你好");
}
f2(f1);
```

fn'('你好')中的 fn 就是 f1
fn('你好') 中的 '你好' 会被赋值给参数 x

### 异步和回调的关系

#### 关联

异步任务需要在得到结果时通知 JS 来拿结果
可以让 JS 留一个函数地址（电话号码）给浏览器
异步任务完成时浏览器调用该函数地址即可（拨电话）
同时把结果作为参数传给该函数（电话里说可以来了）
这个函数是我写给浏览器调用，所以是回调函数

#### 区别

异步任务需要用到回调函数来通知结果
异步常常用到回调但不一定非要回调，还有轮询
回调函数不一定只用在异步任务里
回调可以用到同步任务里

```javascript
array.forEach((n) => console.log(n)); //这就是同步回调
```

### 判断异步与同步

**如果一个函数的返回值处于**
setTimeout
AJAX（即 XMLHttpRequest）
AddEventListener
这三个东西内部，那么这个函数就是异步函数

#### 举例

```javascript
function 摇骰子() {
  setTimeout(() => {
    return parseInt(Math.random() * 6) + 1;
  }, 1000);
}
```

摇骰子() 没有写 return ，就是 return undefined
箭头函数里有 return ，返回真正的结果
所以这是一个异步函数/异步任务
**返回值**

```javascript
const n = 摇骰子();
console.log(n); // undefined
```

**使用回调，写个函数然后把函数地址给它**

```javascript
function f1(x) {
  console.log(x);
}
摇骰子(f1);
function 摇骰子(fn) {
  setTimeout(() => {
    fn(parseInt(Math.random() * 6) + 1);
  }, 1000);
}
//只需要
摇骰子(f1);
```

**简化为箭头函数**
由于 f1 声明之后只用了一次，所以可以删掉 f1

```javascript
摇骰子(f1)=>摇骰子(x=>{console.log(x)})
```

**还能简化成**

```javascript
摇骰子(console.log);
```

**!如果参数不一致就不能这样简化**
**比如**

```javascript
const array = ["1", "2", "3"].map(parseInt);
console.log(array);
//返回 [1,NaN,NaN]
//上面的代码相当于
const array = ["1", "2", "3"].map((item, i, arr) => {
  return parseInt(item, i, arr);
});
```

**parseInt 的参数与 map 的参数不一致所以不能简写**

```javascript
parseInt("1", 0, arr); // 1
parseInt("2", 1, arr); // NaN
parseInt("2", 1, arr); // NaN
```

#### 总结

异步任务不能直接拿到结果
可以传一个回调给异步任务
异步任务完成时调用回调
调用的时候把结果作为参数

### 异步任务两个结果时

#### 方法一：回调接收两个参数

```javascript
fs.readFile("./1.txt", (error, data) => {
  if (error) {
    console.log("失败");
    return;
  }
  console.log(data.toString()); //成功
});
```

#### 方法二：

```javascript
ajax(
  "get",
  "/1.json",
  (data) => {},
  (error) => {}
);
//前面函数是成功回调，后面函数是失败回调
ajax("get", "/1.json", {
  success: () => {},
  fail: () => {},
});
// 接收一个对象，对象有两个 key 表示成功和失败
```

#### ！使用以上两种方法有三个缺点

一、**不够规范**，名称太多，有人用 success + error 有人用 done + fail
二、**容易出现**回调地狱，**代码变得看不懂
三、**很难进行错误处理\*\*

#### 解决方法：

一、规范回调的名字或顺序
二、拒绝回调地狱，让代码可读性更强
三、很方便地捕获错误

```javascript
ajax("get", "/xxx").then(
  (response) => {},
  (request) => {}
);
```

```javascript
ajax = (method, url, options) => {
  return new Promise((resolve, reject) => {
    //!
    const { success, fail } = options;
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        // resolve reject
        if (request.status < 400) {
          resolve.call(null, request.response); //!
        } else if (request.status >= 400) {
          reject.call(null, request); //!
        }
      }
    };
    request.send();
  });
};
```

#### 小结

**第一步**

```javascript
return new Promise((resolve,reject)=>{...})
成功则调用 resolve(result)
任务失败则调用 reject(error)
resolve 和 reject 会再去调用成功和失败函数
```

**第二步**
使用.then(success,fail) 传入成功和失败函数

---

**上面封装的 ajax 的缺点**
**post 无法上传数据**

```javascript
request.send(这里可以上传数据);
```

**不能设置请求头**

```javascript
request.setRequestHeader(key, value);
```

可以选择把 ajax 写到完美
或使用 jQuery.ajax (几近完美)/ axios

### 总结
