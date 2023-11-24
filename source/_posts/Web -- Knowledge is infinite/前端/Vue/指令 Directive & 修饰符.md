---
title: 指令 Directive & 修饰符
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
---
# 指令 Directive & 修饰符
## 基本概念
```vue
<div v-text="x"></div>
<div v-html="x"></div>
```
在 Vue 中以 v- 开头的东西就是指令
## 语法
```vue
v-指令名:参数=值，
v-on:click=add
```
如果值里没有特殊字符，则可以不加引号
有些指令没有参数和值，如 v-pre
有些指令没有值，如 v-on:click.prevent
## 修饰符
### 有些指令支持修饰符
```vue
@click.stop="add" 表示阻止事件传播/冒泡
@click.prevent="add" 表示阻止默认动作
@click.stop.prevent= "add" 同事表示两种意思
```
### .sync 修饰符
#### 场景描述
爸爸给儿子钱，儿子要花钱怎么办
儿子打电话（出发时间）像爸爸要钱
Vue 规则：组件不能修改 props 外部数据
Vue 规则：this.$emit 可以触发事件，并传参
Vue 规则：$event 可以获取 $emit 的参数
所以可以直接使用.sync
```vue
:money.sync = "total"等价于
:money="total" v-on:update:money="total = $event"
```
重要：
```vue
@click.stop = "xxx"
@click.prevent = "xxx"
@keypress.enter ="xxx"
:money.sync="total"
```
