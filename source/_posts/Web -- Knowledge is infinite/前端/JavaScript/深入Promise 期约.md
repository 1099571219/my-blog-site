---
title: 深入Promise 期约
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
date: 2023-11-28
---
# 深入 Promise 期约

JavaScript 作为一门为 Web 而生的语言，它从一开始就需要能够响应异步的用户交互，比如单击和按键操作事件等，Node.js 用回调函数代替了事件，使异步编程在 JS 领域更加流行，但当更多程序开始使用异步编程时，事件和回调函数却不能满足开发者想要做的所有事，它们还不够强大，而 Promise 就是这些问题的解决方案

## 定义

Promise 是另一种异步编程的选择，它既可以像事件和回调函数一样指定稍后执行的代码，也可以明确指示代码是否成功执行，基于这些成功或失败的状态，为了让代码更容易理解和调试，也可以链式的编写 Promise

## 异步编程的背景

JavaScript 引擎是基于单线程（Single-threaded）事件循环的概念构建的，同一时刻只允许一个代码块在执行，与之相反的是像 Java 和 C++ 一样的语言，它们允许多个不同的代码块同时执行，当多个代码块同时访问并改变状态时，程序很难维护并保证状态不会出错<br/>
JavaScript 引擎同一时刻只能执行一个代码块，所以需要跟踪即将运行的代码，那些代码被放在一个任务队列（job queue）中，每当一段代码准备执行时，都会被添加到任务队列，每当 JavaScript 引擎中的一段代码结束执行，事件循环（event loop）会执行队列中的下一个任务，它是 JavaScript 引擎中的一段程序，负责监控代码执行并管理任务队列，记住，队列中的人物会从第一个一直执行至最后一个

### 事件模型

用户点击按钮或按下键盘上的按键会触发类似 onclick 这样的事件，它会向任务队列添加一个新任务来响应用户的操作，这是 JavaScript 中最基础的异步编程形式，直到事件触发时才执行事件处理函数，且执行时上下文与定义时的相同，例如：

```javascript
const button = document.getElementById("btn");
button.onclick = (event) => console.log("clicked");
```

在这段代码中，单击 button 后会执行 console.log('clicked')，赋值给 onclick 的函数会被添加到任务队列中，只有当前面的任务都完成后它才会被执行<br/>
事件模型适用于处理简单的交互，然而将多个独立的异步调用连接在一起，会使程序更加复杂，因为必须跟踪每个事件的事件目标（例如示例中的 button ）。此外，必须保证事件在添加事件处理函数后才被触发。举个例子：如果先单击 button 再给 onclick 赋值，则任何事情都不会发生，所以尽管事件模型适用于响应用户交互和完成类似的低频功能，但其对于更复杂的需求来说却不是很灵活<br/>

### 回调模式

Node.js 通过普及回调函数来改进异步编程模型，回调模式与事件模型类似，异步代码都会在未来的某个时间点执行，二者的区别是回调模式中被调用的函数是作为参数传入的，如下所示：

```javascript
readFile("example.txt", (err, contents) => {
  if (err) {
    throw err;
  } else {
    console.log(contents);
  }
});
console.log("hi");
```

此示例使用 Node.js 传统的错误优先（error-first）回调风格，readFile() 函数读取磁盘上的某个文件，读取结束后执行回调函数（第二个参数），如果出现错误，错误对象会被赋值给回调函数的 err 参数，如果一切正常，文件内容会以字符串的形式被赋值给 contents 参数。<br/>
由于使用了回调模式，readFile() 函数立即开始执行，当读取磁盘上的文件时会暂停执行，也就是说，调用 readFile() 函数后，console.log('hi') 语句立即执行并输出 'hi'；当 readFile() 结束执行时，会向任务队列的末尾添加一个新任务，该任务包含回调函数及相应的参数，当队列前面所有任务完成后才执行该任务，并最终执行 console.log(contents) 输出所有内容<br/>
回调模式比事件模式更灵活，因为相比之下，通过回到模式链接多个调用更容易，比如：

```javascript
readFile("example.txt", function (err, contents) {
  if (err) throw err;
  writeFile("example.txt", function (err) {
    if (err) throw err;
    console.log("File was written successfully");
  });
});
```

在这段代码中，成功调用 readFile() 函数后会执行另一个 writeFile() 函数的异步调用，注意，在这两个函数中是通过相同的基本模式来检查 err 是否存在的，当 readFile() 函数执行完成后，会向任务队列中添加一个任务，如果没有错误产生，则执行 writeFile() 函数，然后当 writeFile() 函数执行结束后也向任务队列中添加一个任务<br/>

虽然这个模式运行效果很不错，但很快就会发现由于嵌套了大量的回调函数，使自己陷入了回调地狱，就像这样:

```javascript
func1((err, result) => {
  if (err) throw err;
  func2((err, result) => {
    if (err) throw err;
    func3((err, result) => {
      if (err) throw err;
      func4((err, result) => {
        if (err) throw err;
        func5(result);
      });
    });
  });
});
```

像示例中这样嵌套多个方法调用，会创建出一堆难以理解和调试的代码，如果想实现更复杂的功能，回调函数的局限性同样也会显现出来，例如，并行执行两个异步操作，当两个操作都结束时通知你；或者同时进行两个异步操作，只取优先完成的操作结果，在这些情况下，需要跟踪多个回调函数并清理这些操作，而 Promise 就能非常好的改进这样的情况<br/>

## 基础知识

Promise 相当于异步操作结果的占位符，它不会去订阅一个事件，也不会传递一个回调函数给目标函数，而是让函数返回一个 Promise 对象，就像这样：

```javascript
// readFile 承诺将在未来的某个时刻完成 (状态转别为)
const promise = readFile("example.txt");
```

在这段代码中，readFile() 不会立即开始读取文件，函数会先返回一个表示异步读取操作的 Promise 对象，未来对这个对象的操作完全取决于 Promise 的**生命周期**

### Promise 的生命周期

每个 Promise 都会经历一个短暂的生命周期：先是处于进行中（pending）的状态，此时操作尚未完成，所以它也是未处理（unsettled）的：一旦异步操作执行结束，Promise 则变为已处理（settled）的状态，在之前的示例中，当 readFile() 函数返回 Promise 时它变为 pending 状态，操作结束后，Promise 可能会进入到以下两个状态中的一个：

- **Fulfilled** Promise 异步操作成功完成

- **Rejected** 由于程序错误或一些其他原因，Promise 异步操作未能成功完成

内部属性 \[\[PromiseState]] 被用来表示 Promise 的 3 种状态：“pending”、“fulfilled” 及 “rejected” 。这个属性不暴露在 Promise 对象上，所以不能以编程的方式检测 Promise 的状态，只有当 Promise 的状态改变时，通过 then() 方法来采取特定的行动<br/>

所有 Promise 都有 then() 方法，它接收两个参数：

- 第一个是当 Promise 的状态变为 fulfilled 时要调用的函数，与异步操作相关的附加数据都会传递给这个完成函数（fulfillment function）；
- 第二个是当 Promise 的状态变为 rejected 时要调用的函数，其与完成时调用的函数类似，所有与失败状态相关的附加数据都会传递给这个拒绝函数（rejection function）

**NOTE:** **如果一个对象实现了上述的 then() 方法，那这个对象就称之为 thenable 对象，所有的 Promise 都是 thenable 对象，但并非所有 thenable 对象都是 Promise**<br/>

then() 的两个参数都是可选的，所以可以按照任意组合的方式来监听 Promise ，执行完成或被拒绝都会被响应，例如：

```javascript
const promise = readFile("example.txt");
promise.then(
  (contents) => {
    //完成
    console.log(contents);
  },
  (err) => {
    //拒绝
    console.error(err.message);
  }
);

//成功
promise.then(console.log);
//拒绝
promise.then(null, (err) => console.error(err.message));
```

上面这三次 then() 调用操作的是同一个 Promise。第一个同时间停了执行完成和执行被拒；第二个之间停了执行完成，错误时不报告；第三个只监听了执行被拒，成功时不报告<br/>

Promise 还有一个 catch() 方法，相当于只给其传入拒绝处理函数的 then() 方法。例如，下面这个 catch() 方法和 then() 方法实现的功能是等价的：

```javascript
promise.catch((err) => {
  //拒绝
  console.error(err.message);
});

//与以下调用相同

promise.then(null, (err) => {
  //拒绝
  console.error(err.message);
});
```

then() 方法和 catch() 方法一起使用才能更好地处理异步操作结果，这套体系能够清楚地指明操作结果是成功还是失败，比事件和回调函数更好用。如果使用事件，在遇到错误时不会主动触发；如果使用回调函数，则必须要记得每次都检查错误参数。如果不给 Promise 添加拒绝处理函数，那所有失败就自动忽略了，所以一定要添加拒绝处理函数，即使只在函数内部记录失败的结果也行<br/>

如果一个 Promise 处于已处理状态，在这之后添加到任务队列中的处理函数仍将执行，所以无论何时都可以添加新的完成处理函数或拒绝处理函数，同时也可以保证这些处理函数能被调用，比如：

```javascript
const promise = readFile("example.txt");

// 最初的完成处理函数
promise.then((contents) => {
  console.log(contents);

  //现在又添加一个
  promise.then((contents) => {
    console.log(contents);
  });
});
```

在这段代码中，一个完成处理函数被调用时向同一个 Promise 添加了另一个完成处理函数，此时这个 Promise 已经完成，所以新的处理函数会被添加到任务队列中，当前面的任务完成后其才被调用，这对拒绝处理函数也同样适用<br/>

**NOTE:** **每次调用 then() 方法或 catch() 方法都会创建一个新任务，当 Promise 被解决（resolved）时执行。这些任务最终会被加入到一个为 Promise 量身定制的独立队列中**

### 创建未完成的 Promise

用 Promise 构造函数可以创建新的 Promise，构造函数只接受一个参数：包含初始化 Promise 代码的执行器（executor）函数。执行器接收两个参数，分别是 resolve() 函数和 reject() 函数，执行器成功完成时调用 resolve() 函数，反之，失败时则调用 reject() 函数<br/>

以下这个示例实在 Node.js 中用 Promise 实现前面的 readFile() 函数:

```javascript
//nodejs 示例

const fs = require("fs");

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    // 触发异步操作
    fs.readFile(filename, { encoding: "utf8" }, (err, contents) => {
      // 检查是否有错误
      if (err) return reject(err);
      // 成功则读取文件
      resolve(contents);
    });
  });
};

const promise = readFile("example.txt");

// 同时监听执行完成和执行被拒
promise.then(
  (contents) => {
    // 完成
    console.log(contents);
  },
  (err) => {
    // 拒绝
    console.error(err);
  }
);
```

在这个示例中，用 Promise 包裹了一个原生 Node.js 的 fs.readFile() 异步调用，如果失败，执行器向 reject() 函数传递错误对象；如果成功，执行器向 resolve() 函数传递文件内容<br/>

要记住，readFile() 方法被调用时执行器会立刻执行，在执行器中，无论是调用 resolve() 还是 reject() ，都会向任务队列中添加一个任务来解决这个 Promise ，如果曾经使用过 setTimeout() 或 setInterval() 函数，应该熟悉这种名为任务编排（job scheduling）的过程，当编排任务时，会向任务队列中添加一个新任务，并明确指定将任务延后执行，例如，使用 setTimeout() 函数可以指定将任务添加到队列前的延时

```javascript
setTimeout(() => {
  console.log("Timeout");
}, 500);

console.log("hi");
```

这段代码编排了一个 500 ms 后才被添加到任务队列的任务，两次 console.log() 调用分别输出以下内容：

```
hi
Timeout
```

由于有 500 ms 的延时，因而传入 setTimeout() 的函数在 console.log("hi") 输出 "Hi" 之后才输出 "Timeout"<br/>

Promise 具有类似的工作原理，Promise 的执行器会立即执行，然后才执行后续流程中的代码，例如：

```javascript
const promise = new Promise((resolve, reject) => {
  console.log("Promise");
  resolve();
});

console.log("hi");
```

这段代码的输出内容是

```
Promise
hi
```

**调用 resolve() 后会触发一个异步操作，传入 then() 和 catch() 方法的回到函数会被添加到 Promise 自身的任务队列中并异步执行，resolve() 将调用 Promise 对象本身的 resolve() 方法**，比如这个示例：

```javascript
const promise = new Promise((resolve, reject) => {
  console.log("Promise");
  resolve();
});

promise.then(() => {
  console.log("resolved");
});

console.log("hi");
```

这个示例的输出内容为：

```
Promise
hi
resolved
```

**请注意，即使在代码中 then() 调用位于 console.log("Hi") 之前，但其与执行器不同，它并没有立即执行，这是因为，完成处理函数和拒绝处理函数总是在执行器完成后被添加到任务队列的末尾**<br/>

### 创建已处理的 Promise

创建未处理的 Promise 的最好方法就是用 Promise 的构造函数，这是由于 Promise 执行器具有动态性，但如果想用 Promise 来表示一个已知值，则编排一个只是简单地给 resolve() 函数传值的任务并无实际意义，反倒是可以用以下两种方法根据特定的值来创建已解决的 Promise

#### 使用 Promise.resolve()

Promise.resolve() 方法只接受一个参数并返回一个完成态的 Promise ，也就是说不会有任务编排的过程，而且需要向 Promise 添加一至多个完成处理函数来获取值，比如：

```javascript
const promise = Promise.resolve(24);

promise.then((res) => console.log(res)); // 24
```

这段代码创建了一个已完成的 Promise ，完成处理函数的形参 res 接收了传入值 24，由于该 Promise 永远不会存在拒绝状态，因而该 Promise 的拒绝处理函数永远不会被调用

#### 使用 Promise.reject()

也可以通过 Promise.reject() 方法来创建已拒绝的 Promise ，它与 Promise.resolve() 很像，唯一的区别是创建出来的是拒绝态的 Promise ，例如：

```javascript
const promise = Promise.reject(24);

promise.catch((res) => {
  console.log(res); //24
});
```

任何附加到这个 Promise 的拒绝处理函数都将被调用，但却不会调用完成处理函数<br/>

**NOTE:** **如果向 Promise.resolve() 方法或 Promise.reject() 方法传入一个 Promise ，那么这个 Promise 会被直接返回**

### 非 Promise 的 Thenable 对象

Promise.resolve() 方法和 Promise.reject() 方法都可以接收非 Promise 的 Thenable 对象作为参数。如果传入一个非 Promise 的 Thenable 对象，则这些方法会创建一个新的 Promise ，并在 then() 函数中被调用<br/>

**拥有 then() 方法并且接收 resolve 和 reject 这两个参数的普通对象就是非 Promise 的 Thenable 对象**，例如：

```javascript
const thenable = {
  then: (resolve, reject) => {
    resolve(24);
  },
};
```

在此示例中，Thenable 对象和 Promise 之间只有 then() 方法这一个相似之处，可以调用 Promise.resolve() 方法将 Thenable 对象转换成一个已完成的 Promise:

```javascript
const thenable = {
  then: (resolve, reject) => {
    resolve(24);
  },
};

const p1 = Promise.resolve(thenable); // ==> return Promise
p1.then((res) => {
  console.log(res); //24
});
```

在此示例中，Promise.resolve() 调用的是 thenable.then() ，所以 Promise 的状态可以被检测到，由于是在 then() 方法内部嗲用了 resolve(24) ，因此 Thenable 对象的 Promise 状态是已完成，新创建的已完成状态 Promise p1 从 Thenable 对象接收传入的值（24），p1 的完成处理函数将 24 赋值给形参 res<br/>

可以使用与 Promise.resolve() 相同的过程创建基于 Thenable 对象的已拒绝 Promise：

```javascript
const thenable = {
  then: (resolve, reject) => {
    reject(24);
  },
};

const p1 = Promise.resolve(thenable); // ==> return Promise
p1.catch((res) => {
  console.log(res); //24
});
```

此示例与前一个相比，除了 Thenable 对象是已拒绝状态外，其余部分比较相似，执行 thenable.then() 时会用值 24 创建一个已拒绝状态的 Promise，这个值随后会被传入 p1 的拒绝处理函数<br/>

有了 Promise.resolve() 方法和 Promise.reject() 方法，可以更轻松地处理非 Promise 的 Thenable 对象，在 ECMAScript 6 引入 Promise 对象之前，许多库都使用了 Thenable 对象，所以如果要向后兼容之前已有的库，则将 Thenable 对象转换为正式 Promise 的能力就叫显得至关重要了，**如果不确定某个对象是不是 Promise 对象，那么可以根据预期结果将其传入 Promise.resolve() 方法中或 Promise.reject() 方法中，如果它是 Promise 对象，则不会有任何变化**

### 执行器错误

如果执行器内部抛出一个错误，则 Promise 的拒绝处理函数就会被调用，例如：

```javascript
const promise = new Promise((resolve, reject) => {
  throw new Error("Explosion");
});

promise.catch((err) => {
  console.log(err.message); // "Explosion"
});
```

在这段代码中，执行器故意抛出了一个错误，**每个执行器中都隐含一个 try-catch 快，所以错误会被捕获并传入拒绝处理函数**，此示例等价于：

```javascript
const promise = new Promise((resolve, reject) => {
  try {
    throw new Error("Explosion");
  } catch (ex) {
    reject(ex);
  }
});

promise.catch((err) => {
  console.log(err.message); // "Explosion"
});
```

为了简化这种常见的用例，执行器会捕获所有抛出的错误，但只有当拒绝处理函数存在时才会记录执行器中抛出的错误，否则错误会被忽略掉，在早期的时候，开发人员使用 Promise 会遇到这种问题，后来，JS 环境提供了一些捕获已拒绝 Promise 的钩子函数来解决这个问题<br/>

## 全局的 Promise 拒绝处理

有关 Promise 的其中一个最具争议的问题是，如果没有拒绝处理函数的情况下拒绝一个 Promise，那么不会提示失败信息，这是 JS 语言中唯一一处没有强制报错的地方，一些人认为这也是标准中最大的缺陷<br/>

Promise 的特性决定了很难检测一个 Promise 是否被处理过，例如：

```javascript
const rejected = Promise.reject(24);
// 这时，rejected 还没有被处理

// 过了一会儿...
rejected.catch((res) => {
  // 现在 rejected 已经被处理了
  console.log(res);
});
```

任何时候都可以调用 then() 方法或 catch() 方法，无论 Promise 是否已解决，这两个方法都可以正常运行，但这就很难知道一个 Promise 何时被处理。在此示例中，Promise 被立即拒绝，但是稍后才被处理<br/>

尽管这个问题在未来版本的 ECMAScript 中可能会被解决，但是 Node.js 和浏览器环境都已分别做出了一些改变来解决开发者这个痛点，这些改变不是 ECMAScript 6 标准的一部分，不过当使用 Promise 的时候它们确实是非常有价值的工具<br/>

### Node.js 环境的拒绝处理

在 Node.js 中，处理 Promise 拒绝时会触发 process 对象上的两个事件：

- unhandledRejection 在一个事件循环中，当 Promise 被拒绝，并且没有提供拒绝处理函数时，触发该条件
- rejectionHandled 在一个事件循环后，当 Promise 被拒绝时，若拒绝处理函数被调用，触发该事件

设计这些事件是用来标识那些被拒绝却又没被处理过的 Promise 的<br/>

拒绝原因（通常是一个错误对象）及被拒绝的 Promise 作为参数被传入 unhandledRejection 事件处理函数中，以下代码展示了 unhandledRejection 的实际应用：

```javascript
let rejected;

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason); // "Explosion"
  console.log(rejected === promise); // true
});

rejected = Promise.reject(new Error("Explosion"));
```

这个示例创建了一个已拒绝 Promise 和一个错误对象，并监听了 unhandledRejection 事件，事件处理函数分别接收错误对象和 Promise 对象作为它的两个参数<br/>

rejectionHandled 事件处理函数只有一个参数，也就是被拒绝的 Promise 对象，例如：

```javascript
let rejected;

process.on("rejectionHandled", (promise) => {
  console.log(rejected === promise); // true
});

rejected = Promise.reject(new Error("Explosion"));

// 等待添加拒绝处理函数
setTimeout(() => {
  rejected.catch((res) => {
    console.log(err.message); // "Explosion"
  });
}, 500);
```

这里的 rejectionHandled 事件在拒绝处理函数最后被调用时触发，如果在创建 rejected 之后直接添加拒绝处理函数，那么 rejectionHandled 事件不会被触发，因为 rejected 创建的过程与拒绝处理函数的调用在同一个事件循环中，此时 rejectionHandled 事件尚未生效<br/>

通过事件 rejectionHandled 和事件 unhandledRejection 将潜在未处理的拒绝存储为一个列表，等待一段时间后检查列表便能够正确地跟踪潜在的未处理拒绝

## 串联 Promise

每次调用 then() 方法或 catch() 方法时实际上创建并返回了另一个 Promise ，只有当第一个 Promise 完成或被拒绝后，第二个才会被解决，比如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

p1.then((res) => {
  console.log(res);
}).then(() => {
  console.log("finished");
});
```

这段代码会输出:

```
24
finished
```

调用 p1.then() 后返回第二个 Promise 对象，紧接着又调用了它的 then() 方法，只有当第一个 Promise 对象被解决之后才会调用第二个 then() 方法的完成处理函数，如果将这个示例拆解开，看起来是这样的：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = p1.then((res) => {
  console.log(res);
});

p2.then(() => {
  console.log("finished");
});
```

在这个非串联版本的代码中，调用 p1.then() 的结果被存储在了 p2 中，然后 p2.then() 被调用来添加最终的完成处理函数，调用 p2.then() 返回的也是一个 Promise 对象，知识在此实例中并未使用<br/>

### 捕获错误

在之前的示例中，完成处理函数或拒绝处理函数中可能会发生错误，而 Promise 链可以用来捕获这些错误，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});
p1.then((res) => {
  throw new Error("Bug");
}).catch((err) => {
  console.log(err.message); // "Bug"
});
```

在这段代码中，p1 的完成处理函数抛出了一个错误，链式调用第二个 Promise 的 catch() 方法后，可以通过它的拒绝处理函数抛出错误，也可以通过相同的方式接收到这个错误：

```javascript
const p1 = new Promise((resolve, reject) => {
  throw new Error("Explosion");
});
p1.catch((err) => {
  console.error(err.message); // "Explosion"
  throw new Error("Bug");
}).catch((err) => {
  console.log(err.message); // "Bug"
});
```

此处的执行器抛出错误并触发 Promise p1 的拒绝处理函数，这个处理函数又抛出另外一个错误，并且被第二个 Promise 的拒绝处理函数捕获，链式 Promise 调用可以感知到链中其他 Promise 的错误<br/>

**NOTE:** 务必在 Promise 链的末尾留有一个拒绝处理函数以确保能够正确处理所有可能发生的错误

### Promise 链的返回值

Promise 链的另一个重要特性是可以给下游 Promise 传递数据，如果在完成处理函数中指定一个返回值，则可以沿着这条链继续传递数据，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

p1.then((res) => {
  console.log(res); // 24
  return res + 1;
}).then((res) => {
  console.log(res); // 25
});
```

执行器传入的 res 为 24 ，p1 的完成处理函数执行后返回 res+1 也就是 25 ，这个值随后被传递给第二个 Promise 的完成处理函数并输出<br/>

在拒绝处理函数中也可以做相同的事，当它被调用时可以返回一个值，然后用这个值完成链条中后续的 Promise ，就像下面这个示例：

```javascript
const p1 = new Promise((resolve, reject) => {
  reject(24);
});

p1.catch((res) => {
  // 第一个拒绝处理函数
  console.log(res); // 24
  return res + 1;
}).then((res) => {
  // 第二个完成处理函数
  console.log(res); // 25
});
```

在这个示例中，执行器调用 reject() 方法向 Promise 的拒绝处理函数传入值 24 ，最终返回 res+1 ，拒绝处理函数中返回的值仍可用在下一个 Promise 的完成处理函数中，在必要时，即使其中一个 Promise 失败也能恢复整条链的执行

### 在 Promise 链中返回 Promise

在 Promise 之间可以通过完成和拒绝处理函数中返回的原始值来传递数据，但如果返回的是 Promise 对象，会通过一个额外的步骤来确定下一步怎么走，比如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  resolve(25);
});

p1.then((res) => {
  // 第一个完成处理函数
  console.log(res); // 24
  return p2;
}).then((res) => {
  // 第二个完成处理函数
  console.log(res); // 25
});
```

在这段代码中，p1 执行后并传入 24 ,然后 p1 的完成处理函数返回一个已解决状态的 Promise p2 ，由于 p2 已经被完成，因此第二个完成处理函数被调用，如果 p2 被拒绝，则调用拒绝处理函数<br/>

关于这个模式，最需要注意的是，第二个完成处理函数被添加到了第三个 Promise 而不是 p2 ，所以之前的示例等价于：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  resolve(25);
});

const p3 = p1.then((res) => {
  // 第一个完成处理函数
  console.log(res); // 24
  return p2;
});

p3.then((res) => {
  // 第二个完成处理函数
  console.log(res); // 25
});
```

很明显的是，此处第二个完成处理函数被添加到 p3 而非 p2 ，这个差异虽然小但非常重要，如果 p2 被拒绝那么第二个完成处理函数就不会被调用，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  reject(25);
});

const p3 = p1.then((res) => {
  // 第一个完成处理函数
  console.log(res); // 24
  return p2;
});

p3.then((res) => {
  // 第二个完成处理函数
  console.log(res); // 不会调用
});
```

在这个示例中，由于 p2 被拒绝了，因此完成处理函数永远不会被调用，但还可以添加一个拒绝处理函数：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  reject(25);
});

const p3 = p1.then((res) => {
  // 第一个完成处理函数
  console.log(res); // 24
  return p2;
});

p3.catch((res) => {
  // 第二个完成处理函数
  console.log(res); // 25
});
```

p2 被拒绝后，拒绝处理函数会被调用并传入 p2 的拒绝值 25<br/>

在完成或拒绝程序中返回 Thenable 对象不会改变 Promise 执行器的执行时机，先定义的 Promise 的执行器先执行，后定义的后执行，以此类推，返回 Thenable 对象仅允许为这些 Promise 结果定义额外的响应，在完成处理函数中创建新的 Promise 可以推迟完成处理函数的执行，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});
p1.then((res) => {
  // 第一个完成处理函数
  console.log(res); // 24

  //创建一个新的 Promise 对象
  const p2 = new Promise((resolve, reject) => {
    resolve(25);
  });
  return p2;
}).then((res) => {
  console.log(res); // 25
});
```

在此示例中，在 p1 的完成处理函数里创建了一个新的 Promise ，直到 p2 被完成才会执行第二个完成处理函数，如果想在一个 Promise 被解决后触发另一个 Promise ，那么这个模式会很有用

## 响应多个 Promise

到目前为止，上面的示例都是单 Promise 响应，如果向通过监听多个 Promise 来决定下一步操作，则可以使用 ECMAScript 6 提供的 Promise.all() 和 Promise.race() 两个方法来监听多个 Promise<br/>

### Promise.all() 方法

Promise.all() 方法只接受一个参数并返回一个 Promise，该参数是一个含有多个需要监视的 Promise 的可迭代对象（例如一个数组），只有当可迭代对象中所有 Promise 都被完成后返回的 Promise 才会被完成，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  resolve(25);
});

const p3 = new Promise((resolve, reject) => {
  resolve(26);
});

const p4 = Promise.all([p1, p2, p3]);

p4.then((res) => {
  console.log(Array.isArray(res)); //true
  console.log(res[0]); //24
  console.log(res[1]); //25
  console.log(res[2]); //26
});
```

在这段代码中，每个 Promise resolve 时都传入一个数字，调用 Promise.all() 方法创建 Promise p4 ，最终当 Promise p1、p2、p3 都处于完成状态后 p4 才能完成，传入 p4 完成处理函数的结果是一个包含每个 resolve 值（24,25,26）的数组，这些值按照传入参数数组中的 Promise 的顺序存储，所以可以根据每个结果来匹配对应的 Promise 对象<br/>

所有传入 Promise.all() 方法的 Promise 只要有一个被拒绝，那么返回的 Promise p4 将不会等待其他 Promise，而是立即调用 reject()：

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve(24);
});

const p2 = new Promise((resolve, reject) => {
  reject(25);
});

const p3 = new Promise((resolve, reject) => {
  resolve(26);
});

const p4 = Promise.all([p1, p2, p3]);

p4.catch((res) => {
  console.log(Array.isArray(res)); //false
  console.log(res); // 25
});
```

在这个示例中，p2 被拒绝并传入值 43 ，没等 p1 或 p3 结束执行，p4 的拒绝处理函数就立即被调用（p1 和 p3 的执行过程会结束，只是 p4 并不会等待）<br/>

拒绝处理函数接收一个值而非数组，该值来自被拒绝 Promise 的 reject() 传入值，在本示例中，传入拒绝处理函数的 25 表示该拒绝来自 p2<br/>

### Promise.race() 方法

Promise.race() 与 Promise.all() 方法稍有不同，就像它的字面意思 race（Promise 之间的赛跑），它也接收含多个 Promise 的可迭代对象作为唯一参数并返回一个 Promise 对象，但只要有一个 Promise 完成就返回该 Promise ，无需等到所有 Promise 都完成，例如：

```javascript
const p1 = Promise.resolve(24);

const p2 = new Promise((resolve, reject) => {
  resolve(25);
});

const p3 = new Promise((resolve, reject) => {
  resolve(26);
});

const p4 = Promise.race([p1, p2, p3]);

p4.then((res) => {
  console.log(res); // 24
});
```

在这段代码中， p1 创建时变处于已完成状态，其他 Promise 的 resolve 用于执行器中，执行后，p4 的完成处理函数被调用并传入值 24 ，其他 Promise 将被忽略，实际上，不管是 resolve 还是 reject ，只要调用其一，则返回对应的处理函数调用，例如：

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    Promise.resolve(24);
  });
});

const p2 = Promise.reject(25);

const p3 = new Promise((resolve, reject) => {
  resolve(26);
});

const p4 = Promise.race([p1, p2, p3]);

p4.catch((res) => {
  console.log(res); // 25
});
```

由于 p2 已经处于被拒绝状态，当 Promise.race() 方法被调用后 p4 也就被拒绝了，尽管 p1 和 p3 最终会完成，但由于发生在 p2 拒绝之后，因此它们的结果会被忽略<br/>

## 自 Promise 继承

Promise 与其他内部类型一样，也可以作为基类派生其他类，所以可以定义自己的 Promise 变量来扩展内建 Promise 的功能，例如，假设想创建一个既支持 then() 方法和 catch() 方法又支持 success() 方法和 failure() 方法的 Promise，则可以这样创建该 Promise 类型：

```javascript
class MyPromise extends Promise {
  // 使用默认的构造函数
  success = (resolve, reject) => {
    return this.then(resolve, reject);
  };
  failure = (reject) => {
    return this.catch(reject);
  };
}

const promise = new MyPromise((resolve, reject) => {
  resolve(24);
});

promise
  .success((res) => {
    console.log(res); // 24
  })
  .failure((res) => {
    console.log(res);
  });
```

在这个示例中，派生自 Promise 的 MyPromise 扩展了另外两个方法：模仿 resolve() 的 success() 方法以及模仿 reject() 的 failure() 方法<br/>

这两个新增方法都通过 this 来调用它模仿的放他，派生 Promise 与内建 Promise 的功能一样，只不过多了 success() 和 failure() 这两个可以调用的方法<br/>

由于静态方法会被继承，因此派生的 Promise 对象也拥有原生的方法，但 resolve 和 reject 和原生 Promise 的略有不同<br/>

由于 MyPromise.resolve() 方法和 MyPromise.reject() 方法通过 Symbol.species 属性来决定返回 Promise 的类型，所以调用这两个方法时无论传入什么值都会返回一个 MyPromise 的实例，如果将内建 Promise 作为参数传入这两个方法，则会返回一个新的 MyPromise ，于是就可以给他的成功及拒绝处理函数赋值，例如：

```javascript
class MyPromise extends Promise {
  // 使用默认的构造函数
  success = (resolve, reject) => {
    return this.then(resolve, reject);
  };
  failure = (reject) => {
    return this.catch(reject);
  };
}

const p1 = new Promise((resolve, reject) => {
  resolve(24);
});
const p2 = MyPromise.resolve(p1);
p2.success((res) => {
  console.log(res); //24
});
```

这里的 p1 是一个内建 Promise 实例对象，被传入 MyPromise.resolve() 方法后得到结果 p2 ，它是 MyPromise 的一个实例，来自 p1 已处理的值传入完成处理函数<br/>

## 总结

Promise 的设计目的是改进 JS 中的异步编程，比事件系统和回调更实用，Promise 对象本身有一个任务队列用于跟踪 Promise 的完成处理函数和拒绝处理函数，并确保正确执行<br/>

Promise 有 3 个状态：进行中（pending），已完成（fulfilled）和已拒绝（rejected）。Promise 的默认状态是进行中，执行成功则会变成已完成，失败则会变成已拒绝，在后两种情况下都可以添加处理函数，以便当 Promise 已处理（settled）时做出响应的操作，通过 then() 方法可以传入完成处理函数或拒绝处理函数，通过 catch() 方法只能添加拒绝处理函数<br/>

有很多种方法可以将 Promise 链接在一起并在它们之间传递信息，每次调用 then() 方法会创建并返回一个新的 Promise 对象，它会在前面的 Promise 被处理后处理，这样的链条可用于触发一系列同步事件的响应，也可以通过 Promise.race() 方法和 Promise.all() 方法来处理多个 Promise 对象的进程，并做出相应的响应<br/>

可以把 Promise 对象的 then() 方法想象成客户端 JS 中注册事件处理函数的 addEventListener()，如果多次调用一个 Promise 对象的 then() 方法，则传入的每个回调函数都会在预期计算完成后被调用<br/>

不过，与很多事件监听器不同，Promise 表示的是一次计算，每个通过 then() 方法注册的函数只会被调用一次，但值得注意的是，即便调用 then() 时异步计算已经完成，传给 then() 的回调函数也会被异步调用<br/>
