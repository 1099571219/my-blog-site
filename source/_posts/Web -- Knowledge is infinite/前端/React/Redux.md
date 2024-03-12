---
title: Redux
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
date: 2023-01-26
---

# Redux

- 什么是 Redux

Redux 是 React 最常用的 **<font color="#1565c0">集中状态管理工具</font>** ，类似于 Vue 中的 Pinia(Vuex)， **<font color="#1565c0">可以独立于框架运行</font>**

作用：通过集中管理的方式管理应用的状态

使用步骤：

1. 定义一个 **<font color="#1565c0"> reducer 函数</font>** (根据当前想要做的修改返回一个新的状态)

作用：根据不同的 action 对象，返回不同的新的 state

```jsx
//state: 管理数据出事状态
//action: 对象 type 标记当前想要做什么样的修改
function reducer(state = { count: 0 }, action) {
  if (action.type === "INCREMENT") {
    return { count: state.count + 1 };
  }
  if (action.type === "DECREMENT") {
    return { count: state.count - 1 };
  }
  return state;
}
```

2. 使用 createStore 方法传入 reducer 函数 生成一个 **<font color="#1565c0">store 实例对象</font>**

```jsx
const store = Redux.createStore(reducer);
```

3. 使用 store 实例的 **<font color="#1565c0">subscribe 方法</font>** 订阅数据的变化(数据一旦变化，可以得到通知)

```jsx
//回调函数可以在每次 state 发生变化的时候自动执行
store.subscribe(() => {
  console.log("state 变化了", store.getState());
  document.getElementById("count").innerText = store.getState().count;
});
```

4. 使用 store 实例的 **<font color="#1565c0">dispatch 方法提交 action 对象</font>** 触发数据变化(告诉 reducer 你想怎么改数据)

```jsx
btn.addEventListener("click", () => {
  //增
  store.dispatch({
    type: "INCREMENT",
  });

  //减
  store.dispatch({
    type: "DECREMENT",
  });
});
```

5. 使用 store 实例的 **<font color="#1565c0">getState 方法</font>** 获取最新的状态数据更新到视图中

## Redux 管理数据流程梳理

![](/images/react/redux1.png)

为了职责清晰，数据流向明确，Redux 把整个数据修改的流程分成了 **<font color="#1565c0">三个核心概念</font>** ，分别是: **<font color="#1565c0">state、action 和 reducer</font>**

1. state-一个对象 存放着我们管理的数据状态
2. action-一个对象 用来描述你想怎么改数据
3. reducer-一个函数 根据 action 的描述生成一个新的 state

## 配套工具

在 React 中使用 redux，官方要求安装俩个其他插件-Redux Toolkit 和 react-redux

1. Redux Toolkit(RTK)-官方推荐编写 Redux 逻辑的方式，是一套工具的集合集，简化书写方式

   - 简化 store 的配置方式
   - 内置 immer 支持可变式状态修改
   - 内置 thunk 更好的异步创建

2. react-redux-用来 链接 Redux 和 React 组件 的中间件

![](/images/react/redux2.png)

## 模板创建和注入

### store 创建

1. 子模块中

```javascript
import { createSlice } from "@reduxjs/toolkit";
const counterStore = createSlice({
  name: "counter",
  //初始化state
  initialState: {
    count: 0,
  },
  //修改状态的方法 同步方法 支持直接修改
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
});

//解构出来 actionCreator 函数
const { increment, decrement } = counterStore.actions;
//获取 reducer
const reducer = counterStore.reducer;

//以按需导出 actionCreator
export { increment, decrement };
//以默认导出的方式导出 reducer
export default reducer;
```

2. store/index.js 模块中

```javascript
import { configureStore } from "@reduxjs/toolkit";
//导入子模块 reducer
import counterReducer from "子模块";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### 为 React 注入 store

react-redux 负责把 Redux 和 React 链接 起来，内置 Provider 组件 通过 store 参数把创建好的 store 实例注入到应用中，链接正式建立

index.js 中

```javascript
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## React 组件与 store

### React 组件使用 store 中的数据

在 React 组件中使用 store 中的数据，需要用到一个钩子函数-useSelector，它的作用是把 store 中的数据映射到组件中，使用样例如下:

```javascript
import { useSelector } from "react-redux";
const { count } = useSelector((store) => store.counter);
// counter 对应 configureStore() 入参中的 reducer 中的 counter
```

### React 组件修改 store 中的数据

React 组件中修改 store 中的数据需要借助另外一个 hook 函数- **<font color="#1565c0">useDispatch</font>** ，它的作用是生成提交 action 对象的 dispatch 函数，使用样例如下:

```jsx
import { useDispatch, useSelector } from "react-redux";
//导入创建 action 对象的方法
import { decrement, increment } from "子模块";

function App() {
  const { count } = useSelector((state) => state.counter);
  // 得到 dispatch 函数
  const dispatch = useDispatch();
  return (
    <div>
      {/** 调用 dispatch 提交 action 对象 */}
      <button onclick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onclick={() => dispatch(increment())}>+</button>
    </div>
  );
}
```

1. 组件中使用哪个 hook 函数获取 store 中的数据?
   **<font color="#1565c0">useSelector</font>**
2. 组件中使用哪个 hook 函数获取 dispatch 方法?
   **<font color="#1565c0">useDispatch</font>**
3. 如何得到要提交 action 对象?
   **<font color="#1565c0">执行 store 模块中导出的 actionCreator 方法</font>**

### 提交 action 传参

在 reducers 的同步修改方法中 **<font color="#1565c0">添加 action 对象参数，在调用 actionCreator 的时候传递参数</font>** ，参数会被传递到 **<font color="#1565c0">action 对象 payload 属性上</font>**

### 异步状态操作

1. 创建 store 的写法保持不变，配置好同步修改状态的方法 2. 单独封装一个函数，在函数内部 return 一个新函数，在新函数中
   2.1 封装异步请求获取数据
   2.2 调用 **<font color="#1565c0">同步 actionCreator</font>** 传入异步数据生成一个 action 对象，并使用 dispatch 提交
2. 组件中 dispatch 的写法保持不变


```javascript
//store 中 异步请求部分
const {setChannels} = channelStore.actions
const fetchChannelList = ()=>{
    return async (dispatch)=>{
        const res = await axios.get('xxx')
        dispatch(setChannels(res.data.data.channels))
    }
}
export {fetchChannelList}

const reducer = channelStore.reducer
export default reducer
```

```jsx
//组件中
import {fetchChannelList} from '子模块'
import {useDispatch}from 'react-redux'
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(fetchChannelList())
},[dispatch])
```



**<font color="#1565c0"></font>**
