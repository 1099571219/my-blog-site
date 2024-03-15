---
title: 实现数据Mock
categories:
  - [Web -- Knowledge is infinite, 前端]
tag: 前端
date: 2023-11-24
---

# 数据 Mock

## json-server 实现数据 Mock

### 实现步骤

1. 安装

```cmd
pnpm i -D json-server
```

2. 准备一个 json 文件

3. 添加启动命令

```json
    "server":"json-server ./server/data.json --port 8888"
```

4. 访问接口进行测试

## apiFox 实现数据 Mock

### 实现步骤

1. 开启 本地/智能云 Mock 环境后可以模拟数据接口
2. 新建请求接口
3. 在响应中配置 json-schema/规则 返回 Mock 用例
