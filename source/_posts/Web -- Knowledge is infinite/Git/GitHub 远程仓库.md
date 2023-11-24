---
title: GitHub 远程仓库
categories: 
- [Web -- Knowledge is infinite,Git]
tag: Git
---
# GitHub 远程仓库
### GitHub 可以存储代码
#### 只需要两行命令
git remote add origin git@xxxxxxxx
git push -u origin master

---

#### 链接你的电脑与github
创建SSH key 验证身份
使用ssh-keygen -t rsa -b 4096 -C 邮箱地址
之后在github个人账户设置的SSH中放入创建的.pub文件
终端使用ssh -t @github.com 进行访问测试，
#### 总结：
使用ssh key，电脑上放私钥，github账号里放公钥
upload的代码是用私钥加密，github用公钥解密，如果解开了，说明是配对的

---

### 上传代码
新建GitHub Repo（仓库），复制其 ssh 地址
复制页面里面的代码（关掉翻译）
.
git remote add origin git@github.com:1099571219/git-demo-1.git
在本地添加远程仓库的地址，origin是远程仓库的默认名字，可以换建议不要换
不要使用https://地址，因为每次都需要密码

git push -u origin 分支名 意思是把分支上传至 origin 里的分支名里
-u是新分支的意思

---

#### 如何上传其他分支
#### 方法一
git push origin x:x 左边的是源头:右边是要传的地方
#### 方法二
git checkout x
git push -u origin x

---

### 如何下载代码
git clone git@xxxxxxxxxxxxxxxx目标路径 会在当前目录下创建一个XXX目录

---

#### 新设备
如果是不同机器，要上传新的ssh key （一机一key）
cd 目标路径
git add / git  commit / [git pull] 可选 / git push 四连操作

---

#### 下载到
git clone git@?/xxx.git 以原始的目录为目录名
xxx/.git 是本地仓库
一般需要接一句cd xxx （进入目录）
git clone git@?/xxx.git yyy 在本地仓库目录命名为yyy
会在本地新建yyy目录，记得cd yyy
git clone git@?/xxx.git .
最后一个字符是点，注意有空格
不会新建目录，使用当前目录容纳代码和.git
当前目录一开始最好是个空目录

---

### 如何下载某个分支
先下载整个仓库再 git checkout 分支名 切换分支

---

### git命令简化
gst / ga / gc / gl / gp 
只需要把想要简化的代码原来的名字写入 ~/.bashrc 内，随后在bash内运行其即可
git stash 通灵术 git add 后如果不想提交可以git stash把它放到一个不会受影响的单独的空间



