---
title: HTML
categories: 
- [Web -- Knowledge is infinite,前端,HTML]
tag: HTML
---
# HTML
## 标签
常用标签介绍
### a 标签属性
href / target / download / rel=noopener
```css
<a href="" target="" download="" rel=""></a>
```
#### 作用
跳转外部页面
跳转内部锚点
跳转到邮箱或电话等
#### a 的  href 的取值
网址 / 路径 / 伪协议 / id
#### a 的 target 的取值
内置名字
_blank / _top / _parent / _self
#### 程序员命名
window 的 name
iframe 的 name

---

### table 表格标签
```css
<table align="center" border="1" cellpadding="20" cellspacing="0" width="500" height="500">
<tr>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
</tr>
<tr>
<td>11</td>
<td>22</td>
<td>33</td>
<td>44</td>
</tr>
<tr>
<td>111</td>
<td>222</td>
<td>333</td>
<td>444</td>
</tr>
<tr>
<td>1111</td>
<td>2222</td>
<td>3333</td>
<td>4444</td>
</tr>
</table>
```
#### 相关的标签
table / thead / tbody / tfoot / tr / td / th
#### 相关的样式
table-layout / border-collapse / border-spacing

---

### img 标签
```css
<img src="man.jpg">
<h2>替换文本</h2>
<img src="1.jpg" alt="这是图片">
<h2>提示文本</h2>
<img src="man.jpg" title="男">
<br>
<img src="oldman.jpg" width="100">
<br>
<img src="oldman.jpg" width="200" border="10">
```
#### 作用
发出get 请求， 展示一张图片
#### 属性
alt / height / width / src
#### 事件
onload / onerror
#### 响应式
max-width:100%

---

### form 标签
```css
<!-- action提交地址 method提交方式 name表单域名称 -->
<form action="asd.php" method="get" name="name1">
</form>
```
#### 作用
发出get 或 post 请求，然后刷新页面
#### 属性
action / autocomplete / method / target
#### 事件 onsubmit

---

### input 标签
```css
<!-- <input type="属性值" />属性值的不同决定了表单元素 -->
<!-- input是单标签 -->
<!-- maxlength为可以输入字符的最大数量 -->
用户名：<input type="text" name="username" maxlength="6" required><br>
<!-- required 如果当前没有填写内容则无法提交表单域 -->
密&nbsp;&nbsp;码：<input type="password" name="pwd" maxlength="6"><br>
<!-- radio为单选按钮 -->
性别：男<input type="radio" name="sex" value="男" checked="checked"> 女<input type="radio" name="sex" value="女"><br>
<!-- checkbox为复选框  可以实现多选-->
爱好：吃饭<input type="checkbox" name="hobby" value="吃饭"> 睡觉<input type="checkbox" name="hobby" value="睡觉"> 打游戏<input
type="checkbox" name="hobby" value="打游戏" checked="checked"><br>
<!-- 单选按钮和复选框都要有相同的name值 -->
<!-- 单选按钮和复选框可以设置checked属性，当页面打开时就可以默认为选中状态 -->
<!-- 除了文本框其余控件的value属性的值都是给后台看的 -->
<input type="submit" name="" id="" value="免费注册">
<!-- 点击submit可以把表单域中表单控件的值送给后台 -->
<input type="reset" value="重新填写">
<!-- 点击reset可以重置表单域到初始状态 -->

<!-- button普通按钮 后期配合JS使用 -->
<input type="button" value="获取短信验证码">
<!-- file 文件域 上传文件用的 -->
上传头像:<input type="file" multiple>
<!-- multiple可以支持同时选择多个文件 -->
<textarea style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
<!-- style="resize:nonre;"意思就是不能随意拖动改变大小 -->
```
#### 作用
让用户输入内容
#### 属性
类型 type: button / checkbox / email / file / hidden / number / password / radio / search / submit / tel / text
其他 name / autofocus / checked / disabled / maxlength / pattern / value / placeholder
#### 事件
onchange / onfocus / onblur（失去聚焦的内容）

---

### 其他输入标签
select + option / textarea / label
#### 注意事项
一般不监听 input 的 click 事件
form 里面的 input 要有 name 
form 里要放一个 type=submit 才能触发事件

---

### 其他标签
video / audio / canvas / svg
#### 注意事项
这些标签的兼容性一定要查看文档

---

## 添加外部资源
#### 添加图片
不要让图片变形
如果图片比例不对，需要使用工具裁剪一下
如果图片尺寸过大，无需特殊处理
如果图片大于300kb，则需要压缩
#### 添加链接
一般需要添加 target=_blank
添加完了之后要自己全部点一遍，防止出错

---

## 兼容设备
#### 代码只需要加上meta:vp就能兼容手机
meta name="viewport"
content="width=device-width,initial-scale=1.0,minimun-scale=1.0,maxmun-scale=1.0,user-scalable=no"
style样式表里面再加上img max-width=100%就行了

---

## html伪协议:
#### 如果想让一个a标签什么都不做，在href 里加入javascript:;
```css
<a href="javascript:">haha </a>
```

---

#### table layout:  CSS属性
定义了用于布局表格单元格，行和列的算法
auto是根据内容来分配宽度，fixed是平均分配空间
```css
table {
  table-layout: fixed;
  table-layout: auto;
}
```

---

#### form标签 
默认自带action="请求往哪发（后端给的，就算报错了也不用管）
action控制请求哪个页面 method控制用哪个方式来请求 
        autocomplete 在选择时会自动给出建议
        target="_blank"把哪个页面变成xxx
```css
<form action="" method="" autocomplete="on" target=""></form>
```

---

#### input标签
```css
<input name="username" type="text">
<input type="submit">
<button type="submit"><span><em>提交</em></span></button>
```
####          <input type="submit">和<button type="submit"></button>的区别
          input submit 里面不支持其他标签，button submit里面可以有任何东西

---

#### form里面必须要有一个type="submit"的按钮里
```css
<input type="submit">
<button type="submit"></button>
```

---

#### 上传头像:<input type="file" multiple>
```css
<input type="file" multiple>
```
multiple可以支持同时选择多个文件 

---

#### 注意事项
一般不监听 input 的 click 事件.
form 里面的 input 要有 name
form 里要放一个 type=submit 才能触发	submit 事件
看不见的 Input 是给计算机填的 ，JS提交信息给后台用的，例如ID、字符串之类的东西

     
