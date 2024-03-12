---
title: ReactRouter
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
date: 2023-01-29
---

# ReactRouter

## ReactRouter 基础

### 什么是前端路由

一个路径 path 对应一个组件 component 当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染

```javascript
const routes = [
  {
    path: "/article",
    component: Article,
  },
  {
    path: "/about",
    component: About,
  },
];
```

安装

```cmd
pnpm i react-router-dom
```

### 创建路由

```jsx
// router/index.js 模块
import Login from "../page/Login";
import Article from "../page/Article";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//1. 创建 router 实例对象并配置路由对应关系
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article",
    element: <Article />,
  },
]);
export default router;

// main.js 模块
//1. 导入router
import router from "./router";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*2. 路由绑定 */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

### 路由导航

路由系统中的多个路由之间需要进行 **<font color="#1565c0">路由跳转</font>** ，并且在跳转的同时有可能需要 **<font color="#1565c0">传递参数进行通信</font>**

#### 声明式导航

声明式导航是指通过在模版中通过 **<font color="#1565c0">`<Link/>`组件描述出要跳转到哪里</font>** 去，比如后台管理系统的左侧菜单通常使用这种方式进行

```jsx
<Link to="/article">文章</Link>
```

语法说明:通过给组件的 **<font color="#1565c0">to 属性指定要跳转到路由 path</font>** ，组件会被渲染为浏览器支持的 a 链接，如果需要传参直接 **<font color="#1565c0">通过字符串拼接</font>** 的方式拼接参数即可

#### 命令式导航

命令式导航是指通过 **<font color="#1565c0">`useNavigate`</font>** 钩子得到导航方法，然后通过 **<font color="#1565c0">调用方法以命令式的形式</font>** 进行路由跳转，比如想在登录请求完毕之后跳转就可以选择这种方式，更加灵活

```jsx
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      登录页
      <button onClick={() => navigate("/article")}>跳转文章页</button>
    </div>
  );
};
```

语法说明:通过调用 navigate 方法传入地址 path 实现跳转

### 导航传参

#### searchParams 传参

```jsx
navigate("/article?id=10&name=john");

//接收参数
const [params] = useSearchParams();
let id = params.get("id");
```

#### params 传参

```jsx
navigate("/article/10/john");

//接收
const params = useParams();
let id = params.id;
let name = params.name;

//router 实例配置
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
]);
```

id 和 name 是在构造 router 实例时提前配置的占位符

### 嵌套路由配置

在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称作二级路由

实现步骤：

1. 使用 children 属性配置路由嵌套关系
2. 使用'<Outlet/>'组件配置二级路由渲染位置

```jsx
//router
{
    path:'/',
    element:<Layout/>,
    children:[
        {
            path:'board',
            element:<Board/>
        },
        {
            path:'about',
            element:<About/>
        }
    ]
}

//Layout组件内
const Layout = ()=>{
    return(
        <div>
            <div>Layout</div>
            <Link to='/board'>面板</Link>
            {/** 二级路由出口 */}
            <Outlet />
        </div>
    )
}
```

### 默认二级路由

当访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置 **<font color="#1565c0">去掉 path，设置 index 属性为 true</font>**

```jsx
children: [
  {
    index: true,
    element: <Board />,
  },
  {
    path: "about",
    element: <About />,
  },
];
```

### 404 路由配置

场景:当浏览器输入 url 的路径在整个路由配置中都找不到对应的 path，为了用户体验，可以使用 404 兜底组件进行渲染

实现步骤:

1. 准备一个 NotFound 组件
2. 在路由表数组的末尾，以\*号作为路由 path 配置路由

```jsx
//组件
const NotFound = ()=>{
    //自定义模板
    return <div>this is NotFound</div>
}
export default NotFound

//router
{
    path:'*',
    element:<NotFound />
}
```

### 两种路由模式

各个主流框架的路由常用的路由模式有俩种， **<font color="#1565c0">history 模式和 hash 模式</font>** ，ReactRouter 分别由 createBrowerRouter 和 createHashRouter 函数负责创建

| 路由模式 |  url 表现   |           底层原理            | 是否需要后端支持 |
| :------: | :---------: | :---------------------------: | :--------------: |
| history  |  url/login  | history 对象 + pushState 事件 |       需要       |
|   hash   | url/#/login |     监听 hashChange 事件      |      不需要      |


**<font color="#1565c0"></font>**
