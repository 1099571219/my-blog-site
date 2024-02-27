---
title: XHR 和 fetch 的区别
categories:
  - [Web -- Knowledge is infinite, 前端, Web]
tag: Web
date: 2023-11-24
---

# XHR 和 fetch 的区别

## Fetch 功能优势
1. Service Worker 环境里也能用，相比 xhr 只能运行在渲染进程内
2. 同源请求也可以自定义不带 cookie，某些服务不需要 cookie 场景下能少些流量
3. 可自定义重定向场景，xhr 只能 follow
4. 自由度更高的 cache 配置
5. 可自定义 referrer