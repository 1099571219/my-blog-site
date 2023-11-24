---
title: vue cli 项目迁移 vite
categories: 
- [Web -- Knowledge is infinite,前端,构建相关]
tag: 构建相关
---
# vue cli 项目迁移 vite
### 尝试执行陈旧 vue cli 项目
在解析 @cesium 中的 GLTFLoader.js 文件时，由于其 js 文件中使用了可选连 ?. 未转译，导致 cli 在编译时报了几个 loader 缺失的问题，导致项目没法正常运行，需要添加转译后即可正常被解析
