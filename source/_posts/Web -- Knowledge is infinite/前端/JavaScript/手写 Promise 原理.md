---
title: 手写 Promise & 原理
categories:
  - [Web -- Knowledge is infinite, 前端, JavaScript]
tag: JavaScript
date: 2023-12-02
---

# 手写 Promise 原理

## 介绍

**本章对 Promise 进行一个简易版的描述与实现**,具体为:

- 执行器
- 生命周期
- queueMicroTask 微任务队列
- resolve() & reject()
- promise 自身的 taskQueue
- then()
- 测试

## 执行器

首先需要明确几点：<br/>

- 执行器器作为构造函数的入参，是一个函数
- 接收 resolve 和 reject 两个函数作为参数
- 这个执行器会在实例构造时立即执行

```typescript
//------------
type Resolve = (value?: any) => void;
type Reject = (reject?: any) => void;
type OnFulfilled = ((value?: any) => any) | any;
type OnRejected = ((reason?: any) => any) | any;
type ThenType = (
  onFulfilled?: OnFulfilled,
  onRejected?: OnRejected
) => ZPromise;
type Executor = (resolve: Resolve, reject: Reject) => void;
//-------------以上为类型声明

class ZPromise {
  constructor(executor: Executor) {
    console.log("exec executor");
    executor();
  }
}

const zPromise = new ZPromise(() => {
  console.log("sync exec zPromise");
});
```

## 生命周期

每个 Promise 都会经历一个短暂的生命周期

Promise 的生命周期有两种阶段和三种状态：<br/>

两种阶段:

- unsettled：未处理（执行器中未执行到 resolve 或 reject）
- settled：已处理（执行了 resolve 或 reject）<br/>

三种状态：

- pending：进行中 (执行器进行中，类似未处理)
- fulfilled：操作成功完成（类似已处理）
- Rejected：由于程序错误或一些原因，又或是主动调用 reject 时触发

```typescript
class ZPromise {
  PENDING: string = "pending";
  FULFILLED: string = "fulfilled";
  REJECTED: string = "rejected";
  status: string;
  constructor(executor: Executor) {
    // 初始化生命周期
    this.status = this.PENDING;
    // 会在 settled 阶段改变
    console.log("init status");
    executor();
  }
}
```

## queueMicroTask 微任务队列

当调用 queueMicrotask( 回调 ) 函数后，会将回调加入当前微任务队列末尾<br/>
当前同步任务执行完毕后执行微任务队列中的所有微任务<br/>
如果有未完成的微任务，则等完毕后才会执行下一个宏任务<br/>

## resolve() & reject()

当调用这两个函数之后，生命周期就会改变，且是不可逆的<br/>

- 调用 resolve 时，微异步执行回调队列中每项的 onFulfilled 回调
- 调用 reject 时，微异步执行回调队列中每项的 onRejected 回调
- 执行器加入错误捕获（ 处理程序错误捕获在后面 then() ）

回调队列是 then() 方法中传入的回调函数

```typescript
class ZPromise {
  PENDING: string = "pending";
  FULFILLED: string = "fulfilled";
  REJECTED: string = "rejected";
  status: string;
  constructor(executor: Executor) {
    this.status = this.PENDING;
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value: any) => {
    if (this.status === this.PENDING) {
      this.status = this.FULFILLED;
      this.value = value;
      queueMicrotask(() => {
        this.callbacks.forEach((item) => {
          item.onFulfilled!(this.value);
        });
      });
    }
  };
  reject = (reason: any) => {
    if (this.status === this.PENDING) {
      this.status = this.REJECTED;
      this.value = reason;
      queueMicrotask(() => {
        this.callbacks.forEach((item) => {
          item.onRejected!(this.value);
        });
      });
    }
  };
}
```

## promise 自身的 taskQueue

当调用 then( 回调 ) 方法时，会触发一个判断<br/>
判断当前生命周期是否为 pending

- 是：将传入的回调添加到当前 Promise 的任务回调队列中（onFulfilled、onRejected）
- 否：将微异步的执行这个回调，并将已处理的值作为回调的入参使用

```typescript
if (this.status === this.FULFILLED) {
  queueMicrotask(() => {
    // 执行传入 then() 的 onFulfilled 回调
  });
}

if (this.status === this.REJECTED) {
  queueMicrotask(() => {
    // 执行传入 then() 的 onRejected 回调
  });
}
if (this.status === this.PENDING) {
  this.callbacks.push({
    onFulfilled: (value) => {
      // 执行传入 then() 的 onFulfilled 回调
    },
    onRejected: (reason) => {
      // 执行传入 then() 的 onRejected 回调
    },
  });
}
```

## then()

then() 方法需要返回一个新的 Promise 对象，并支持链式调用，以及错误捕获:

- 判断 then() 入参是否为函数，否则转换成直接返回传入值的函数
- 如果入参回调是函数且有返回值，则将返回值作为新 Promise 对象的已处理方法入参值 ( resolve( 值 )、reject( 值 ))

```typescript
class ZPromise {
  PENDING: string = "pending";
  FULFILLED: string = "fulfilled";
  REJECTED: string = "rejected";
  status: string;
  // 任务回调队列
  callbacks: Array<{ onFulfilled?: OnFulfilled; onRejected?: OnRejected }>;
  //处理程序传入值
  value: any = null;
  constructor(executor: Executor) {
    this.status = this.PENDING;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }
  resolve = (value: any) => {
    if (this.status === this.PENDING) {
      this.status = this.FULFILLED;
      this.value = value;
      queueMicrotask(() => {
        this.callbacks.forEach((item) => {
          item.onFulfilled!(this.value);
        });
      });
    }
  };
  reject = (reason: any) => {
    if (this.status === this.PENDING) {
      this.status = this.REJECTED;
      this.value = reason;
      queueMicrotask(() => {
        this.callbacks.forEach((item) => {
          item.onRejected!(this.value);
        });
      });
    }
  };

  //-----------------------------------------

  then: ThenType = (onFulfilled, onRejected) => {
    if (typeof onFulfilled !== "function") {
      onFulfilled = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reason) => reason;
    }

    const promise = new ZPromise((resolve, reject) => {
      if (this.status === this.FULFILLED) {
        queueMicrotask(() => {
          this.parse(onFulfilled?.(this.value), resolve, reject);
        });
      }

      if (this.status === this.REJECTED) {
        queueMicrotask(() => {
          this.parse(onRejected?.(this.value), resolve, reject);
        });
      }
      if (this.status === this.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            this.parse(onFulfilled?.(value), resolve, reject);
          },
          onRejected: (reason) => {
            this.parse(onRejected?.(reason), resolve, reject);
          },
        });
      }
    });
    return promise;
  };

  //处理重复代码
  parse = (result: any, resolve: Resolve, reject: Reject) => {
    try {
      resolve(result);
    } catch (err) {
      reject(err);
    }
  };
}
```

## 测试一下

```typescript
const p = new ZPromise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  });
});
const p2 = new ZPromise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  });
});
const p3 = new ZPromise((resolve, reject) => {
  resolve("5");
});
const p4 = new ZPromise((resolve, reject) => {
  reject("6");
});

p.then(() => {
  console.log("1");
}).then(() => {
  console.log("2");
});
p2.then(() => {
  console.log("3");
});
p.then(() => {
  console.log("4");
});
p3.then((res) => {
  console.log(res);
  return "7";
}).then((res) => {
  console.log(res);
});
p4.then(null, (res) => {
  console.log(res);
});
p3.then((res) => {
  console.log("8");
});

// 执行结果是
// 5 -> 6 -> 8 -> 7 -> 1 -> 4 -> 2 -> 3
/** 过程
p macro:{
  micro: console.log(1);
  micro: console.log(4);
  micro: console.log(2);
}
p2 macro:{
  micro: console.log(3);
}
p3 micro: console.log(5);
p4 micro: console.log(6);
p3 micro: console.log(8);
p3 micro: console.log(7);
 */
```
