---
title: JSX&JS
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
mermaid: true
date: 2024-02-04
---

# JSX&JS

## 描述

jsx 是 react 的语法糖

允许在 html 中写 js

需要通过 babel、webpack 编译转化为 JS 执行

## 区别

JS 可以直接在浏览器中执行 - JSX 需要编译

JSX 是 React.createElement 的语法糖

```jsx
// jsx React 17RC 版本之前，都需要在组件顶部引入
// jsx 最终都会被转换成 React.createElement... 去创建元素 
import React from 'react';
```

```javascript
// jsx React 17RC 版本之后
// jsx 可以不被转换成 React.createElement

function App(){
  return <h1>hello</h1>
}
//编译
import {jsx as _jsx} from 'react/jsx-runtime'

function App(){
  return _jsx('h1',{children:"hello"})
}
```

## 为什么 React 自定义组件首字母大写

- React.createElement 参数类型
  - type 元素类型
  - props 元素属性
  - children 子元素

jsx => vDOM => DOM

小写开头会被判定为字符串
大写开头在 React 中会识别为变量

```js
<app>hello</app>
// 转译
React.createElement('app',null,'hello')
// 会报错  因为没有名为 app 的标签

<App>hello</App>
React.createElement(App,null,'hello')

```



