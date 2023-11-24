---
title: WWW浅析
categories: 
- [Web -- Knowledge is infinite,前端,Web]
tag: Web
---
# WWW浅析
## URL 统一资源定位符
#### 协议 + 域名或 IP +端口号 + 路径 + 查询字符串 + 锚点
### Internet Protocal 网络协议
#### 如何定位一台设备
**只要在互联网中，就至少有一个独特的 IP **

---

#### 如何获取外网 IP 
从网络运营商处租用带宽
只要路由器连上运营商的服务器，那么路由器就会有一个外网IP，比如14.48.44.209 就是一个外网IP，这就你在互联网中的地址
如果重启路由器，那么很有可能被重新分配一个外网IP，也就是说你的路由器没有一个固定的外网IP
#### 内网IP
路由器会在家里创建一个内网，内网中的设备使用内网IP，一般来说内网 IP 的格式都是 192.168.xxx.xxx,一般路由会给自己分配一个好记的内网 IP，如192.168.1.1
然后路由器会给每一个内网设备分配不同的内网IP

---

#### 路由器的功能
现在路由器有两个IP，一个外网 IP 和一个内网 IP
内网中的设备可以互相访问，但是不能直接访问外网
内网设备想要访问外网，就必须经过路由西中转
外网中的设备可以互相访问，但是无法访问你的内网
外网设备想要把内容送到内网，也必须通过路由器
也就是说内网和外网就像两个隔绝的空间，无法互通，唯一的联通点就是路由器
所以路由器有时候也被叫做 网关

---

#### 几个特殊的IP
#### 分别是
127.0.0.1 表示自己
localhost 通过 hosts 指定为自己
0.0.0.0 不表示任何设备

---

### 端口
#### 不同的服务对应不同的窗口
咖啡店提供两个窗口，一号快餐，二号咖啡
去快餐窗口点咖啡会被拒绝，让你去另一个窗口
去咖啡窗口点快餐结果 一样

---

#### 一台机器可以提供不同服务
要提供 HTTP 服务最好使用 80 端口
要提供 HTTPS 服务最好使用 443 端口
要提供 FTP 服务最好使用 21 端口
一共有 65535 个端口（基本够用）
#### 如何知道该用什么端口
查询维基百科获得详细端口服务列表

---

#### 端口使用还有什么规则
0 到 1023 （2的10次方减1）号端口是留给系统用的
你只有拥有了管理员权限后，才能使用这1024个端口
其他端口可以给普通用户使用
比如 http-server 默认使用 8080 端口
一个端口如果被占用，就只能换一个端口

---

### 总结
**IP和端口缺一不可**

---

### Domain name域名
#### 域名就是对 IP 的别称
ping baidu.com 对应什么 IP
ping baidu.com
#### 重点
一个域名可以对应不同 IP
这个叫做均衡负载，防止一台机器扛不住
一个 IP 可以对应不同域名
这个叫共享主机，初期开发者会这么做
### PING 程序
ping 是一个只用几千行写的程序
ping 域名/IP 返回域名对应的IP
### nslookup 命令
查询 DNS 记录 

---

### 域名和 IP 是怎么对应起来的 （DNS）
#### 当输入baidu.com时
**过程**
你的 Chrome 浏览器会向电信/联通提供的 DNS 服务器询问 xdm.com 对应什么 IP
电信/联通会回答一个 IP （具体过程很复杂）
然后 Chrome 才会向对应 IP 的 80 / 443 端口发送请求
请求内容是查看 xdm.com 的首页
#### 为什么是80或443端口
服务器默认用 80 提供 http 服务
服务器默认用 443 提供 https 服务
可以在开发者工具里看到具体的端口

---


### 同一个内容，不同位置
#### 锚点可以做到
#### 注意
锚点看起来有中文，实际不支持中文
#中文 会变成 #字符
**锚点是无法在 Network 面板看到的**
**因为锚点不会传给服务器**

---

### curl 命令
curl 域名/ 	IP
curl -v 域名/ IP 查看详细
curl -s 域名/ IP 查看简写

---

## HTTP 超文本传输协议
### 请求和响应
#### 如何发请求
**方法**
用 Chrome 地址栏
用 curl 命令
**概念**
帮忙发请求的工具叫做 用户代理
英文名 User Agent

---

### 如何做出一个响应
**需用编程**
Node.js 有一个 http 模块可以做到
```css
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\nnode server.js 8888 ')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method
  
    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    if (path = '/') {
        console.log('有人访问/');
    }
    // if (path === '/') {
    //     response.statusCode = 200
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     response.write(`qiqiqiqiqi`)
    //     response.end()
    // } else if (path === '/x') {
    //     response.statusCode = 200
    //     response.setHeader('Content-Type', 'text/css;charset=utf-8')
    //     response.write(`body{color: red;}`)
    //     response.end()
    // } else {
    //     response.statusCode = 404
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     response.write(`你输入的路径不存在对应的内容`)
    //     response.end()
    // }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n http://localhost:' + port)
```
**注意事项**
这些代码是服务器代码，一般放在服务器上
path 是不带查询参数的路径 /x
query 是查询参数的对象形式 {a :'1'}
queryString 是查询参数的字符串形式 ?a=1
pathWithQuery 是带查询参数的路径，一般不用
request 是请求对象
response 是响应对象

---

### 代码逻辑
#### 语法
`这种字符串`里面可以回车
'这种字符串' 里面要回车只能用\n  表示
#### 逻辑
每次收到请求都会把中间的代码执行一遍
用 if else 判断路径，并返回响应
如果是已知路径，一律返回200
如果是未知路径，一律返回404
Content-Type 表示内容的 类型/语法
response.write() 可以填写返回的内容
response,end() 表示响应可以发给用户了
#### 注意事项
URL 里的后缀卵用没有，/y.css 不一定是 CSS 内容
Content-Type 才是决定文件类型的关键

---

### HTTP 基础概念
#### 请求
请求动词 路径加查询参数 协议名/版本
Host: 域名或IP
Accetp : text/html
Content-Type : 请求体的格式
回车
请求体（就是上床内容）
#### 细节
三部分：请求行、请求头、请求体
请求动词有 GET / POST / PUT / PATCH / DELETE 等
请求体在 GET 请求中一般为空
文档位于 RFC 2612 第五章

---

#### 响应
协议名 / 版本 状态码 状态字符串
Content - Type: 响应体的格式
回车
响应体（也就是下载内容）
#### 细节
三部分：状态行、响应头、响应体
常见的状态码是重点
文档位于 RFC 2612 第六章

---



