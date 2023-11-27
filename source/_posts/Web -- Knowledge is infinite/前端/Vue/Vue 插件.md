---
title: Vue 插件
categories: 
- [Web -- Knowledge is infinite,前端,Vue]
tag: Vue
date: 2023-11-24
---
# Vue 插件
插件由一个对象构成，对象需要有一个 install 安装函数，应用在使用插件的时候会自动调用该函数，该函数的第一参数是应用实例，第二个参数是配置选项，可以通过在使用插件的时候传入，在插件中可以使用 provide 进行依赖注入或配置实例的全局属性以供组件使用
