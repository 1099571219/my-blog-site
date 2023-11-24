---
title: CSS3DRenderer 和 CSS2DRenderer 的区别
categories: 
- [Web -- Knowledge is infinite,可视化,Tree.js]
tag: Tree.js
---
# CSS3DRenderer 和 CSS2DRenderer 的区别
 两者本质上就是将 DOM 标签 3D 化渲染在页面上，最终使用的时 CSS 的 Transform
CSS2DRenderer 其实是将 canvas 中的三维物体和 HTML 标签相结合，是 3D 的简化版，支支持位移，也就是始终会面向摄像机
CSS3DRenderer 优化：当大量数据面板存在时，添加分区面板开关以及类似LOD模型的区域分级实现，在摄像机靠近时会自动开启3D数据面板，或者通过交互手动开启，并且根据需要对面板数据进行分页，虚拟滚动等分批请求，避免一次渲染多个面板，因为每次实时数据更新时渲染面板都需要转化成 CSS 是非常消耗性能的

两个面板最大的区别就是 2D 只支持位移效果，而3D面板则支持形变的效果，可以改变面板朝向
而且都有一个缺点就是只支持100%的浏览器缩放以及显示器缩放
