---
title: 最少知识原则 LKP
categories: 
- [Web -- Knowledge is infinite,编程思想,设计原则和编程技巧]
tag: 设计原则和编程技巧
date: 2023-11-24
---
# 最少知识原则 LKP
## 定义
最少知识原则 （ Least Knowledge Principle  ）说的是一个软件实体应当尽可能少地与其他实体发生相互作用，这里的软件实体是一个广义的概念，不仅包括对象，也包括系统、类、函数、变量等
比如《面向对象设计原理与模式》中提到}：
“某军队中的将军需要挖掘一些散兵坑，下面是完成任务的一种方式：将军可以通知上校让他叫来少校，然后让少校叫来上尉，并让上尉通知一个军士，最后军士唤来一个士兵，然后命令士兵挖掘一些散兵坑”
这种方式很离谱，在这条命令链中任何一个对象的改动都会影响整条链的结果
很有可能是，将军自己根本就不会考虑挖散兵坑这样的细节信息，但是如果将军真的考虑了这个问题的话，它一定会通知某个军官：“我不关心这个工作如何完成，但是你得命令人去挖散兵坑”
## 含义
最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互，如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的相互联系，常见的做法就是引入一个第三者对象，来承担这些对象之间的通信作用，如果一些对象需要向另一些对象发起请求，可以通过第三者对象来转发这些请求
