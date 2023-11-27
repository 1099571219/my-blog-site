---
title: webpack & vite 区别
categories: 
- [Web -- Knowledge is infinite,前端,构建相关]
tag: 构建相关
date: 2023-11-24
---
# webpack & vite 区别
## 开发服务构建
### webpack
webpack 兼容性更好，支持多模块化转换，提供 AST 模块语法分析，可以直接使用 cjs 模块语法
webpack 会在资源打包后启动开发服务的，也因为支持多模块语法，所以一开始构建时就需要把所有模块的语法转换成统一的模块化语法进行解析，这就导致了项目体积越大，这个统一模块化过程所花费的时间就越多
### vite
vite 是使用基于浏览器端进行开发体验优化，缺少 AST 操作步骤，无法直接在项目中使用 es module 之外的模块语法
vite 构建资源顺序和 webpack 不同，是先启动开发服务器再进行资源打包，通过 es build 按需解析依赖，不需要一次性解析所有依赖，时间上就会快非常多
