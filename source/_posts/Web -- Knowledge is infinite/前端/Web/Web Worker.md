---
title: Web Worker
categories: 
- [Web -- Knowledge is infinite,前端,Web]
tag: Web
date: 2023-11-24
---
# Web Worker
Web Worker 是 HTML5 中的概念，它有两种类型，一种是专用线程 （ Dedicated Web Worker ），另一种是共享线程 （ Shared Web Worker ）
## 用途
Web Worker 主要用于将一些**耗时**的**数据处理操作从主线程剥离**，从而**使主线程专注**于页面的渲染与逻辑交互
比如 懒加载，文本分析，流媒体数据处理，canvas 图形绘制，图像处理
## 注意
有**同源限制**
**无法访问 DOM **节点
运行在另一个上下文中，**无法使用 window** 对象
Web Worker 的运行**不会影响主线程**，**但**与主线程的交互任然受到主线程单线程的制约，如果 Web Worker 线程**频繁与主线程交互**，那么**主线程频繁处理交互**任然**可能**导致**页面发生阻塞**
**共享线程可以被多个**浏览上下文（ Browsing context ）**调用**，但所有这些浏览上下文**必须同源**
因为 Web Worker 有同源限制，所以在本地调试的时候也需要通过启动本地服务器的方式访问，使用 file:// 协议直接打开的话将会抛出异常
## 专用线程 Dedicated Web Worker
只能被创建它的脚本使用
专用线程由 Worker() 方法创建，可以接收两个参数，第一个参数是必填的脚本的位置，第二个参数是可选的配置对象，可以指定 type、credentials、name 三个属性。
```javascript
if (window.Worker) {
    // ...
  const dedicatedWorker = new Worker('worker.js')
}
  
```
## 共享线程 Shared Web Worker 
共享线程可以被多个脚本使用
共享线程使用 Shared Worker() 方法创建，同样支持两个参数，用法与 Worker() 一致。
```javascript
if (window.Worker) {
    // ...
	var sharedWorker = new SharedWorker('shared-worker.js')
}
```
## 数据传递
Worker 线程和主线程都通过 postMessage() 方法发送消息，通过 onmessage 事件接收消息。在这个过程中数据并不是被共享的，而是被复制的。 Error 和 Function 对象不能被结构化克隆算法复制，如果传递则会抛出 DATA_CLONE_ERR 的异常。另外，postMessage() 一次只能发送一个对象
### 专用线程
```javascript
function execDedicatedWorker() {
    const dedicatedWorker = new Worker(new URL('./dedicated-worker.js', import.meta.url))
    dedicatedWorker.postMessage(messageMul)
    dedicatedWorker.onmessage = (ev) => {
        console.log(ev.data);
    }
}
```
在 Worker 线程中，self 和 this 都代表子线程的全局对象。对于监听 message 事件，以下的四种写法是等同的
```javascript
importScripts(new URL('../process/process-set', import.meta.url))//多次 postMessage 只会引入一次
console.log('dedicated worker');
self.onmessage = (ev) => {
    // console.log(ev);
    self.postMessage(processSet[ev.data.method]?.(ev.data.data))
    self.close()
}

```
### 共享线程
共享线程需要双方通过 port.start() 启用，想要查看线程脚本内的日志内容需要在浏览器设置中开启 shared web worker 控制台
```javascript
const sharedWorker = new SharedWorker(new URL('./shared-worker.js', import.meta.url))
    sharedWorker.port.start()
    sharedWorker.port.postMessage(messageAdd)
    sharedWorker.port.onmessage = (e) => {
        console.log(e.data);
    }
```
线程脚本中可以省略 self、this
```javascript
importScripts(new URL('../process/process-set2', import.meta.url))
console.log('shared web worker');
onconnect = function (e) {
    const port = e.ports[0]
    console.log(port);
    port.addEventListener('message', function (e) {
        console.log(e.data);
        port.postMessage(processSet[e.data.method]?.(e.data.data))

    })
    port.start();
}
```
下面是测试连接仓库地址
[GitHub - 1099571219/web-worker](https://github.com/1099571219/web-worker)



