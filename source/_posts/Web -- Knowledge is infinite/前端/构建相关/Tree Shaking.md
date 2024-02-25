---
title: Tree Shaking
categories: 
- [Web -- Knowledge is infinite,构建相关]
tag: 构建相关
date: 2023-11-24
---
# Tree Shaking
## vue3 中 Tree Shaking 特性
vue3 中的 tree shaking主要是借助了 ES6 的模块语法（import和export），基于 ES6 模块的静态编译思想，在编译时就能确定模块的依赖关系，以及输入和输出的变量
无非就是做了两件事：

1. 编译阶段利用 ES Module 判断哪些模块已经加载
2. 判断哪些模块和变量未被使用或者引用，进而删除对应代码
