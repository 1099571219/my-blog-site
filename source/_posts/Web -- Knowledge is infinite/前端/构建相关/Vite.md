---
title: Vite
categories: 
- [Web -- Knowledge is infinite,前端,构建相关]
tag: 构建相关
date: 2023-11-24
---
# Vite
##  create-vite 脚手架
内置了 vite 以及一些 preset
pnpm create vite 实际上就等于使用 create-vite 脚手架创建项目
## Vite 基础
### out of box 开箱即用
在依赖预构建处理过程中如果遇到了非绝对或相对路径的引用，则会尝试开启路径补全，以此方式自动引入 node_modules 模块，并且对依赖的引用进行集成，避免浏览器对第三方依赖的死亡式引用请求，让项目正常在浏览器上运行
### 依赖预构建
首先 vite 会找到入口文件直接引用的依赖（bare-import，不包含按需加载模块的依赖），然后调用 esbuild （对 js 模块规范进行统一的库），将 esm 以外的模块规范统一转成 esm 模块规范，然后放到当前目录的 node_modules/.vite/deps 下，同时对 esmodule 规范的各个模块进行统一集成（import 重写成 function）
#### 解决问题

1. vite 无法对 esm 以外的模块规范进行整合，有了依赖预构建调用 esbuild 就能对第三方依赖的导出格式进行统一
2. vite 对路劲补全的处理上就可以直接使用 .vite/deps ，方便路径重写
3. 网络多包传输的性能问题（也是 esmodule 不支持 node_modules 的原因之一），有了依赖预构建之后无论依赖有多少 export 和 import ，vite 最后都会把他们集成为一个或几个 import
### 配置文件处理细节
#### 配置文件提示

1. 使用 vite 自带的函数 defineConfig 
2. 使用 /** @type import("vite").UserConfig */
```javascript
//1-------------------
import { defineConfig } from 'vite'
export default defineConfig({
    optimizeDeps: {}
})
//2-------------------
/** @type import('vite').UserConfig */
const viteConfig = {
    optimizeDeps: {}
}
export default viteConfig
```
#### 多环境处理
```javascript
import { defineConfig } from "vite";
import viteBaseConfig from "./config/vite.base.config";
import viteDevConfig from "./config/vite.dev.config";
import viteProdConfig from "./config/vite.prod.config";

//策略模式
const envResolver = {
    "serve": () => {
        console.log('开发环境');
        return { ...viteBaseConfig, ...viteDevConfig }
    },
    "build": () => {
        console.log('生产环境');
        return Object.assign({}, viteBaseConfig, viteProdConfig)
    }
}

export default defineConfig(({ command }) => envResolver[command]())
```
#### vite 中的环境变量
vite 内置了 dotEnv 库，dotEnv 库会自动解析 .env 字符串文件，比如将变量声明通过 replace 转换成 Key:val 的格式包在对象中，并插入到 process 对象中（但是 vite 考虑到和其他配置的一些冲突问题，并不过直接注入到 process 对象下）
涉及 vite.config.js 中的一些配置包括：

1. root
2. envDir：用来配置当前环境变量的文件目录

**vite 通过 loadEnv 来解决上面的问题**
调用 loadEnv() 来确认环境变量文件地址：  会将传进来的比变量值进行拼接 ".env.development"，并根据我们提供的目录去取对应的配置文件并解析，默认 prefix 为 VITE，并放进返回的对象中
```javascript
const baseEnvConfig = xxx
const modeEnvConfig = xxx
const lastEnvConfig = {...baseEnvConfig,...modeEnvConfig}
```
如果是客户端，这个 env 会被放入 import.meta.env 中（注意：vite 做了一个拦截，防止我们将隐私性的变量直接放进 import.meta.env 中，如果变量名不是以 VITE 开头的，它就不会把变量注入到客户端中去）
prefix 拦截可以通过 config 中进行配置
```javascript
export default defineConfig({
    envDir: process.cwd() + "\\env",
    envPrefix: "PUB_"
})
```
### Vite 开发服务
启动 vite 服务时会先进行依赖预构建，随后启动 dev 服务器，当浏览器识别 js 文件中存在 import  时，会向 dev 服务器发送请求，dev 服务器会将请求的目标文件通过各种 loader 编译成 js 或 css 或其他资源进行返回，比如请求 vue 文件，dev 服务器会将 vue 文件转换为JS 文件，其中会对 template 文件进行模板编译处理，script 会进行转译，css 文件如果使用了 sass 则会使用 sass-loader 编译成 css ，随后将内容返回给浏览器
### css module

1. module.css （ module 是一种约定，表示需要开启 css 模块化）
2. 它会将所有类名进行一定规则的替换（类似加上 hash）
3. 同时创建一个映射对象{classname: "_classname_hashval"}
4. 将替换后的内容塞进 style 标签中然后放入到 head 标签中 （能够读到 index.html 文件内容，类似字符串替换）
5. 将原本的 x.module.css 文件内容全部清除，替换成 JS 脚本
6. 将创建的映射对象在脚本中进行默认导出
### 解决开发服务跨域
同源策略是浏览器的，只有响应经过浏览器才会检查，服务器之间的请求是没有同源策略的，通过开发服务器在浏览器检查响应之前做一个中间层，用来代理转发请求和响应，来实现跨域
## 优化
### 开发时构建优化
不像 webpack 是对全部引用依赖进行构建，所以 webpack 很需要 cahce-loader  thread-loader 之类的提升构建速度的优化， vite 本身是通过依赖预构建入口后直接给浏览器，后续引用资源执行的是按需加载，通过开发服务器去处理引用资源，就不太需要在意这些
### 优化运行性能
#### 首屏加载优化
懒加载：也就是按需加载通过代码实现，vite 分析代码后进行分 chunk 输出 （根据情况进行配置）
http 缓存：强缓存、协商缓存
强缓存：
协商缓存
分区渲染
### 生产构建优化 vite (rollup)
分包: 将按需引入、公共依赖和不会常规更新的第三方依赖单独打包成一个文件，避免在业务代码变更导致的浏览器缓存更新带上这个第三方依赖一起重新缓存，这样变更次数多了浏览器就会浪费很多缓存，也变相提升了请求的负担，公共依赖分包则是避免重复编译
压缩：可以通过 gzip 格式压缩过大的文件，只需要后端返回时带上 content-type 为 gzip 就行
动态导入： import() 将未进入的组件存在js文件中，进入页面时再通过 script 文件插入到页面 body 中，按需请求
优化体积： 压缩，three-shaking，cdn 加载， ...
