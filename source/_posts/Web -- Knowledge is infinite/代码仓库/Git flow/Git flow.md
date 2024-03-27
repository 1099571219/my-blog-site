---
title: Git Flow
categories: 
- [Web -- Knowledge is infinite,代码仓库,Git Flow]
tag: 代码仓库
date: 2023-11-24
---

# 模拟协同开发

不能在 main （主分支）分支直接编写代码
开发功能需要在新功能分支上进行，最终测试无误后合并入主分支

## 流程

- 创建组织
- 创建项目主仓库
- Clone 主仓库
- Fork 主仓库和 Clone Fork 仓库 (开源项目)
- 添加上游地址
- 同步最新代码
- 创建功能分支 （new function)
- 提交代码合并分支
- 合并最新代码 （既然合并冲突）
- 推送代码
- 提交 Pull Request
- 讨论审核代码
- 合并和部署
- 删除功能分支