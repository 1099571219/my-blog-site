---
title: Vue 模板
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---

# Vue 模板

## 模板

### 一、Vue 完整版，写在 HTML 里

```vue
<div id = xxx>
  {{n}}
  <button @click="add">+1</button>
</div>

new Vue({
	el:'#xxx',
  data:{n:0}, // data 克洛伊改成函数
  methods:{add(){}}
})
```

### 二、Vue 完整版，写在选项里

```vue
<div id="app">
</div>
new Vue({ template:`
    <div>
    	{{n}}
      <button @click="add">+1</button>
    </div>
`, data:{n:0},// data 可以改成函数 methods:{add(){ this.n += 1}}
}).$mount('#app') // 注意:div#app 湖北替代
```

### 三、Vue 非完整版，配合 xxx.vue 文件

```vue
<template>
  <div>
    {{ n }}
    <button @click="add">+1</button>
  </div>
</template>
<script>
export default {
  data() {
    return { n: 0 };
  },
  //data 必须为函数
  methods: {
    add() {
      this.n += 1;
    },
  },
};
</script>
<style>
这里写 CSS
</style>
```

```vue
import Xxx from './xxx.vue' //Xxx 是一个 options 对象,大写不会跟原生组件冲突 new
Vue({ render:h=>h(Xxx) }).$mount('#app')
```

ps: 这是 XML 语法，不是 HTML 语法

## 语法

### 展示内容

#### 表达式

```vue
{{ object.a }} //表示把构造选项里的 data 中的 object.a 显示在HTML里

{{ n + 1 }} //可以写任何运算

{{ fn(n) }} //可以调用函数，fn会在 methods 里面找，如果methods里没有fn，会报错
如果值为 undefined 或 null 就不会显示 另一种写法为
<div v-text="表达式"></div>
=== {{ 表达式 }}
```

#### HTML 内容

假设 data.x 值为 <strong>hi</strong>

<div v-html="x"></div> 即可显示 粗体的 hi，默认是不会显示hi的
#### 如果单纯想展示 {{ n }}
```vue
<div v-pre>{{ n }}</div>
```
v-pre 不会对模板进行编译，直接会在页面显示div内的内容
### 绑定属性
#### 绑定 src
```vue
<img v-bind:src="x" />
```
#### v-bind: 简写为 :
```vue
<img :src="x" />
```
#### 绑定对象
```vue
<div
     :style="{border:'1px solid red',height:100}">//这里可以把 '100px'写成100
</div>
```
### 绑定事件
#### v-on: 事件名
```vue
<button v-on:click="add">+1</button>
//点击之后，Vue 会运行 add()
<button v-on:click="xxx(1)">xxx</button>
//点击之后，Vue 会运行 xxx(1)
<button v-on:click="n+=1">xxx</button>
//点击之后，Vue 会运行 n+=1
```
如果发现写的是函数，就加括号调用之，否则就直接运行代码
#### 缩写
```vue
<button @click="add">+1</button>
//正常都用缩写
```
### 条件判断
#### if...else
```vue
<div v-if="x>0">x大于0</div>
<div v-else-if="x===0">x为0</div>
<div v-else>x小于0</div>
```
### 循环
#### for(value,key) in 对象或数组
```vue
<ul>
  <li v-for="(u,index) in users" :key="index">
    索引：{{index}}值：{{u.name}}
  </li>
</ul>
```
```vue
<ul>
  <li v-for="(value,name) in obj" :key="name">
    属性名：{{name}},属性值：{{value}}
  </li>
</ul>
```
### 显示、隐藏
#### v-show
```vue
<div v-show="n%2===0"> n 是偶数</div>
```
近似
```vue
<div :style="{display:n%2===0?'block':'none'}"> n 是偶数</div>
```
注意：看得见的元素 display 不只有 block
如 table 的 display 为 table，li 的 display 为 list-item
## 总结
### Vue 模板主要特点有
使用 XML 语法 （不是HTML）
使用 \{\{}} 插入的表达式
使用 v-html v-on v-bind 等指令操作 DOM
使用 v-if v-for v-show等指令实现条件判断和循环与显示隐藏
