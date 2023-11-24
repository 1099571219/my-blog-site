---
title: AJAX 原理
categories: 
- [Web -- Knowledge is infinite,前端,JavaScript]
tag: JavaScript
---
# AJAX 原理
## 背景
### AJAX 是浏览器上的功能
浏览器可以发请求，收响应
浏览器在 window 上加了一个 XMLHttpRequest 函数
用这个构造函数（类） 可以构造出一个对象
JS 通过它实现发请求，收响应
## 收发请求与加载
### 用 AJAX 加载文件内容
#### 四个步骤（写法）
**第一步**：创建 HttpRequest 对象 （**XMLHttpRequest**）
**第二步**：调用对象的 **open **方法
**第三步**：监听 **onreadystatechange** 事件，在事件处理函数里操作 CSS 文件内容
**第四步**：调用对象的 **send **方法（发送请求）
#### onreadystatechang 的五个状态：
**0 代表 已创建请求且未使用 open() 方法 cosnt ...**
**1 代表 使用了open() 方法**
**2 代表 使用了 send() 发送了请求，等到返回的第一个字节出现时开始进行状态3**
**3 代表 开始下载返回的内容，当最后一个内容下载完成后会变成状态4**
**4 代表 下载完成**

```javascript
//服务器
if (path === '/1.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('test/1.xml'))
        response.end()
}
```
```javascript
//JS
const getXML = document.querySelector('.getXML')
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('get', './1.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                console.log('加载失败' + request.status)
            }
        }
    }
    request.send()
};

```
### 总结
**HTTP 是个框，什么都能往里装**
可以装HTML、CSS、JS、XML等
要设置好正确的 Content-Type
学会解析内容
**解析方法**
得到 CSS 之后生成 style 标签
得到 JS 之后生成 script 标签
得到 HTML 之后使用 innerHTML 和 DOM API
得到 XML 之后使用 responseXML 和 DOM API
不同类型的数据有不同类型的解析方法


