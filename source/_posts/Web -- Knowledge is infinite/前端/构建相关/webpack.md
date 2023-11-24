---
title: webpack
categories: 
- [Web -- Knowledge is infinite,前端,构建相关]
tag: 构建相关
---
# webpack
## 优化
#### 为什么要用（场景）
#### 它是什么
#### 怎么用
### 1.提升开发体验
#### SourceMap
用来生成源代码与构建后代码一一映射的方案
构建完会生成对应的 .map 文件
方便调试查找错误位置
### 2.提升打包构建速度
#### HotModuleReplacement
可以通过配置 HMR 实现热模块替换，webpack5 是默认配置了 HMR，当没有配置HMR的开发服务时，项目中的模块一旦更新，整个项目就会被重新构建并刷新浏览器，会花费很多时间构建未改变的模块，这时如果不开启 webpack5 默认的 HMR，或者第三方加载器不支持 HMR 时， 则需要手动进行配置 module.hot.accept()
#### OneOf
减少构建时对多个 loader 的判断过程，需要检测的文件越多，提升越明显
#### Include & Exclude
二者同时只能使用一种，include 时，只执行包括的文件，而 exclude 则是除该文件外全部执行
一般在使用第三方依赖时，大部分都是已经编译好的代码，直接引入使用即可，无需再进行额外编译，如果强行编译则会造成大量无用消耗
#### Cache
在第二次打包时只针对改变的模块进行 eslint 和 babel 等的检测和编译打包，能够使第二次打包整体速度更快
#### Thread
通过 thread-loader 可以进行多线程处理 loader，一般在处理 JS 时，也就是 babel-loader 执行前执行 thread-loader，也可以作用在 Eslint 插件上，进行多线程代码检测，可以提升检测和编译 JS 的速度
#### Terser
Webpack5 自带 terserPlugin，直接 reqire 引入即用，配置后可以极大程度的压缩 JS 体积，在打包模块时花费的时间自然也会变少
### 3.减少代码体积
#### Tree-Shaking
在编译时通过静态模板分析标记并移除 JS 上下文中未引用的代码达到减小最终包的体积
#### @babel/plugin-transform-runtime 
在 babel 生成 JS 文件时会在每个文件中创建辅助代码，文件越多体积影响越大，通过 babel-transform-runtime 插件在需要创建辅助代码时，改创建为引用，这样编译文件时就不会重复创建辅助代码，减少 babel 生成文件体积
### 4.优化代码运行性能
#### CodeSplit
通过配置 splitChunk 可以对入口进行分 chunk，达到平衡请求数量，公共模块的处理，避免重复打包编译公共模块 ，通过 import() 动态加载语法可以实现 chunk 按需加载，配置 CodeSplit 可以避免出口文件臃肿，提高页面运行效率
#### Preload & Prefetch
通过 PreloadPlugin 可以配置后续按需加载的文件选择立即加载或浏览器空闲时加载，之后在触发按需加载时则会直接使用缓存，提升后续加载速度
#### Contenthash > Network cache
通过给动态、公共模块添加 contenthash ，以确保在公共、动态模块内容改变时，则依赖于这些模块的其他模块的 hash 不会改变，就不会误触浏览器缓存更新，提升缓存持久性
#### Core-JS
遇到一些 babel 智能预设无法转换的 API 时，在一些低版本浏览器上会出现问题，此时就需要使用 core-js 来进行兼容性转译
#### PWA
渐进式网络应用程序，支持在离线时持续运行，内部通过 Service Workers 技术实现

## 基本
### loader
用于辅助加载各种类型文件让打包工具能够解析
#### 四种优先级
 pre、normal、inline、post 四种依次优先顺序，默认是 normal 模式，多个同级 loader 存在时，执行顺序从右至左，从下至上
#### loader 四种类型
 同步 loader： 只能写同步操作
```javascript
// context 文件内容
// map SourceMap
// meta 别的 loader 传递的数据
module.exports = function (context, map, meta) {
    console.log('sync-loader-meta')
    console.log(meta)
  //第一个参数为要传递的错误信息
    this.callback(null, context, map, meta)
}
```
异步 loader： 可以写异步操作
```javascript
module.exports = function (context, map, meta) {
    console.log('async-loader-meta')
    console.log(meta)
    meta = meta ?? []
    meta.push(1)
    const callback = this.async()
    setTimeout(() => {
        callback(null, context, map, meta)
    }, 1000);
}
```
raw-loader： 可以将传入数据转换为 buffer 形式
```javascript
module.exports = function (context) {
    console.log('raw-loader-context');
    // console.log(context);
    return context
}
module.exports.raw = true //设置接受数据为 buffer
```
pitch-loader：当使用多个loader 时 pitch loader 的执行顺序和 normal loader 是相反的，自左至右，自上至下，采用熔断机制判断是否跳过后续部分 loader 的执行
```javascript
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch')
    console.log('remainingRequest')
    // console.log(remainingRequest)
    console.log('precedingRequest')
    // console.log(precedingRequest)
    // return 'stop' //执行后会跳过后续 loader 只执行 normal 前一个 raw-loader
};
```
### Plugin
plugin 插件负责插入到特定的打包阶段 Tapable 钩子事件中，在webpack 执行的过程中会执行对应的 Tapable钩子事件，从而达到改变整个生产线的作用
```javascript
1.首先 webpack 会加载 webpack.config.js 中的所有配置，此时就会 new TestPlugin() ，执行插件的 constructor
2.webpack 创建唯一一次 compiler 对象
3.遍历 plugins 里的所有插件，调用插件的 apply 方法，将 compiler 作为参数传入
4.执行剩下编译流程 （触发后续各个 hooks 事件）

class TestPlugin {
  constructor() {
      console.log("testPlugin")
  }
  apply(compiler) {
      console.log('apply TestPlugin')
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin ______________ environment 111');
        });
        //文档说明： emit 是异步串行钩子，后续需要等待 emit 完成后执行
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            console.log("TestPlugin ______________ emit");
            setTimeout(() => {
                console.log('TestPlugin ______________ emit 222');
                callback()
            }, 2000)
        });
        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin ______________ emit 333');
                    resolve()
                }, 1000)
            })
        });
        //文档说明： make 是异步并行钩子，谁先返回结果就处理谁
        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            console.log("TestPlugin ______________ make");
            // 需要在 compilation hooks 触发前注册才能生效
            compilation.hooks.seal.tap("TestPlugin", () => {
                console.log("TestPlugin ______________ seal");
            })
            setTimeout(() => {
                console.log('TestPlugin ______________ make 444');
                callback()
            }, 3000)
        });
        compiler.hooks.make.tapPromise('TestPlugin', (compilation) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin ______________ make 555');
                    resolve()
                }, 1000)
            })
        });
  }
}

module.exports = TestPlugin
```
#### Tapable 钩子事件
会在相应阶段执行注册的钩子，比如 environment，make，seal、emit，钩子又分串行/并行异步
tap： 可以注册同步钩子和异步钩子
内部异步操作则使用以下两种方式
tapAsync： 回调方式注册异步钩子
tapPromise： Promise 方式注册异步钩子
#### 构建对象
##### Compiler
compiler 对象中保存着完整的 webpack 环境配置，每次启动 webpack 构建时都会生成一个唯一的 compiler 对象，该对象会在 webpack 启动时被创建，可以通过 compiler 对象访问到 webpack 的主环境配置compiler.options，里面包含着 loader、plugin 等配置信息
compiler.hooks 可以注册 tapable 的不同种类 hook，从而可以在 compiler 生命周期中植入不同的逻辑
##### Compilation
compilation 对象代表一次资源的构建，compilation 实例能够访问所有的模块和他们的依赖
一个 compilation 对象会对构建依赖图中所有模块进行编译，在编译阶段，模块会被加载(load)、封存(seal)、优化(optimize)、分块(chunk)、哈希(hash)和重新创建(restore)
compilation.modules 可以访问所有模块，打包的每一个文件都是一个模块
compilation.chunk：chunk 即是多个 modules 组成而来的一个代码块，入口文件引入的资源组成一个 chunk ，通过代码分割的模块又是另外的 chunk
compilation.assets 可以访问本次打包生成所有文件的结果
compilation.hooks 可以注册 tapable 的不同种类的 hook ，用于在 compilation 编译模块阶段进行逻辑添加以及修改
##### 生命周期简图
![image.png](https://cdn.nlark.com/yuque/0/2023/png/23100954/1698501762654-86a7a526-1543-44ca-a100-e5246257b2b7.png#averageHue=%23faf5f2&clientId=ucd2fcd0a-67b5-4&from=paste&height=774&id=uc3727ab0&originHeight=1064&originWidth=769&originalType=binary&ratio=1.375&rotation=0&showTitle=false&size=227838&status=done&style=none&taskId=u41e05832-e513-4861-b671-3e04b4062c4&title=&width=559.2727272727273)


## Compiler & Compilation
Compiler 包含所有 webpack 的配置内容，可以创建 Compilation 对象，触发生命周期钩子，可以通过 tap 注册生命周期钩子中的事件，主要用来挂载 Plugin
Compilation 是生命周期钩子对应的执行对象，主要是做资源模块的编译，优化，封存，分 chunk，哈希等操作的
