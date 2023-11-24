---
title: Vue 实例
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
---
# Vue 实例
## 如何使用 Vue 实例
### 方法一：从 HTML 得到视图
完整版Vue
从 CDN 引用 vue.js 或 vue.min.js 即可做到
也可以通过 import 引用 vue.js 或者 vue.min.js
### 方法二：用 JS 构建视图
使用 vue.esm.js
### 方法三：使用 vue-loader
可以吧 .vue 文件翻译成 h 构建方法
但这样做 HTML 就只有一个 div#app , SEO 不友好
## Vue 构造选项
### Options 的五类属性
#### 数据：
data , props , propsData , computed , methods , watch
#### DOM:
el , template , render , renderError
#### 生命周期钩子： 
beforeCreate ,  created , beforeMount , mounted , beforeUpdate , updated , activated , deactivated , beforeDestroy , destroyed , errorCaptured
#### 资源： 
directives , filters , components
#### 组合： 
parent , mixins , extends , provide , inject
### 入门属性
#### el-挂载点
与 $mount 有替换关系
#### data - 内部数据
支持对象和函数，优先用函数
#### methods - 方法
事件处理函数或者是普通函数
#### components
三种声明方式
使用 Vue 组件，注意大小写
#### 四个钩子
created - 实例出现在内存中
mounted - 实例出现在页面中
updated - 实例更新了
destroyed - 实例消亡了
#### props
可以传入
### 进阶属性
#### computed - 计算属性
**用途**
computed 是用来计算出一个值的，这个在调用的时候不需要加括号，可以当属性一样用
根据依赖能够自动缓存，如果依赖不变，computed的值就不会重新计算
#### watch - 侦听
**用途**
当数据变化时，执行一个函数
**变化**
obj 原本是{a:'a'} ,对他赋值{a:'a'}后
obj变了， obj.a 没变
简单类型看值，对象类型看地址
**immediate:true**
是一个参数，表示是否在第一次渲染的时候就执行函数
**deep:true**
如果 object.a 变了，想让 object也变就 使用 deep:true，反之用deep:false
deep 的意思是，监听 object 的时候是否往深了看
#### directives - 指令
**自定义指令**
**一：声明一个全局指令**
Vue.directive('x',directiveOptions)
**二：声明一个局部指令**
```vue
new Vue({
	...,
	directives:{
		"x": directiveOptions
	}
})
//v-x 只能用在该实例中
```
#### directiveOptions
**函数属性**
```vue
bind(ell,info,vnode,oldVnode)- 类似 created
inserted(参数同上) = 类似 mounted
upadate(参数同上) - 类似updated
compoonentUpdated(参数同上)
unbind(参数同上)-类似 destroyed
```
```vue
directives: {
    on2: {
      inserted(el, info) {
        console.log(info);
        el.addEventListener(info.arg, console.log(info.value));
      },
      unbind(el, info) {
        el.removeEventListener(info.arg, info.value);
      },
    },
  },
```
**指令的作用**
**主要用于 DOM 操作**
Vue 实例/组件用于数据绑定、事件监听、DOM更新
Vue 指令主要目的就是原生 DOM 操作
**减少重复**
如果某个 DOM 操作经常使用，就可以封装为指令，比较复杂的也可以
#### Mixin 混入
**目的：减少重复**
**类比**
directives 的作用是减少 DOM 操作的重复
mixins 的作用是减少 data、methods、钩子的重复
选项智能合并
```javascript
const log = {
  data() {
    return {
      name: undefined,
      time: undefined,
    };
  },
  created() {
    this.time = new Date();
    console.log(`${this.name}出生了`);
  },
  beforeDestroy() {
    const now = new Date();
    console.log(`${this.name}死亡了，共生存了${now - this.time}ms`);
  },
}
export default log;
```
#### extend 继承
也是减少重复
#### provide 提供 & inject 注入
作用：大范围的 data 和 method 等共用
注意：不能只传 themeName 不穿 changeTheme，因为 themeName 的值是被复制给 provide 的
#### 总结
**directives 指令**
全局用 Vue.directive('x',{...})
局部用 options.directives
作用是减少 DOM 操作相关重复代码
**mixins 混入**
全局用 Vue.mixin({...})
局部用 options.mixins:[mixin1,mixin2]
作用是减少 options 里的重复
**extends 继承/扩展**
全局 Vue.extend({...})
局部用 options.extends:{...}
作用跟 mixins 差不多，只是形式不同
**provide/inject 提供和注入**
祖先提供东西，后代注入东西
作用是大范围、隔 N 代共享信息
### v-model
```vue
v-model 等价于 :value = "xxx" @input="xxx = $event.target.value"
```
