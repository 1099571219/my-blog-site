---
title: Node
categories: 
- [Web -- Knowledge is infinite,Node]
tag: Node
date: 2023-11-24
---
# Node
## path 相关
### path 和 __dirname 的区别
path 使用 path.resolve(__dirname, 相对路径 ) 解决了在不同系统下绝对路径的兼容性问题，比如在 mac 下 __dirname 的绝对路径值是使用 /  而 win 下则是 \
### node 下的相对路径
node 会默认使用 process.cwd() 去拼接相对路径
## 

