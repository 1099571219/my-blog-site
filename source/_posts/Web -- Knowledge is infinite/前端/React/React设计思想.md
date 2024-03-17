---
title: React设计思想
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
date: 2024-02-04
---

# React 设计思想

## 组件化

### 开闭原则

封闭：组件内部状态由自身维护 - 只处理内部渲染逻辑

开放：针对组件通信 - 不同组件可以通过 props 单向数据流进行交互

## 数据驱动视图

公式： UI = f(data)

不能直接操作 DOM - 修改数据 state props - 数据驱动视图更新

## 虚拟 DOM

DOM 操作消耗性能(遍历真实 DOM 性能损失太大) - vDOM - 描述真实 DOM 的 js 对象

更新时会进行两次 vDOM 的比较
new vDOM - old vDOM
通过 diff 进行比较得到需要更新的部分 - 数据增量更新
通过 vDOM 来简化真实 DOM 提高 diff 算法性能从而提升 DOM 操作过程的性能
