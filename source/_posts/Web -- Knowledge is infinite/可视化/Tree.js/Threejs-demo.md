---
title: Threejs-demo
categories: 
- [Web -- Knowledge is infinite,可视化,Tree.js]
tag: Tree.js
---
# Threejs-demo
### 遇到问题汇总:
使用 tailwindcss 在TSX 中使用模板字符串计算宽度后添加至标签中不生效，当存在两个标签以上时，只有其中一个会生效，目前推测 tailwindcss 在 TSX 的标签中使用模板字符串获取计算后的值无法生效，即使页面检查 class 加上了也不生效
![image.png](https://cdn.nlark.com/yuque/0/2023/png/23100954/1681833975985-da992a53-4cd7-4ed3-b4ec-8a3e91b2c413.png#averageHue=%23282b37&clientId=u615e3620-fd19-4&from=paste&height=781&id=u6e0db06c&originHeight=976&originWidth=943&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=130981&status=done&style=none&taskId=ude533152-7c7b-49c9-8637-c4311ea79de&title=&width=754.4)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/23100954/1681834081464-513745ca-8b22-4b3e-a49d-4c68dd4347c1.png#averageHue=%230b0908&clientId=u615e3620-fd19-4&from=paste&height=1002&id=ue3a34eae&originHeight=1252&originWidth=2560&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=413196&status=done&style=none&taskId=u97eaab97-3a22-4348-a8eb-2c5eeccbed4&title=&width=2048)
