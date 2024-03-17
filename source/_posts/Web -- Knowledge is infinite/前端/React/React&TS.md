---
title: React&TS
categories:
  - [Web -- Knowledge is infinite, 前端, React]
tag: React
mermaid: true
date: 2024-02-03
---

# React&TS

## 基础

### useState

#### 自动推导

通常 React 会根据传入 useState 的默认值来自动推导类型,不需要显式标注类型

```typescript
// value: 类型为 boolean
// toggle: 参数类型为 boolean
const [value, toggle] = useState(false);
```

#### 传递泛型参数

useState 本身是一个 **<font color="#1565c0">泛型函数</font>** ，可以传入具体的自定义类型

```ts
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User>();
```

1. 限制 useState 函数参数的初始值必须满足类型为:User | ()=>User
2. 限制 setUser 函数的参数必须满足类型为:User | ()=>User | undefined
3. user 状态数据具备 User 类型相关的类型提示

#### 初始值为 null

当我们不知道状态的初始值是什么，将 useState 的初始值为 nul 是一个常见的做法，可以通过具体类型联合 null 来做显式注解

```ts
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User | null>(null);
```

1. 限制 useState 函数参数的初始值可以是 User|nul
2. 限制 setUser 函数的参数类型可以是 User|null

### props

#### 基础类型

为组件 prop 添加类型，本质是给函数的参数做类型注解，可以使用 type 对象类型或者 interface 接口来做注解

```tsx
type Props = {
  className: string;
  title?: string;
};

function Button(props: Props) {
  const { className } = props;
  return <button className={className}>click</button>;
}
```

说明:Button 组件只能传入名称为 className 的 prop 参数，类型为 string,且为必填

#### children 类型

children 是一个比较特殊的 prop,支持多种不同类型数据的传入，需要通过一个 **<font color="#1565c0">内置的 ReactNode 类型</font>** 来做注解

```tsx
type Props = {
  className: string;
  children: React.ReactNode;
};

function Button(props: Props) {
  const { className, children } = props;
  return <button className={className}>{children}</button>;
}
```

说明： 注解之后，children 可以是很多种类型，包括：React.ReactElement、React.ReactFragment、React.ReactPortal 等

#### 事件 prop 类型

组件经常执行类型为函数的 prop 实现子传父，这类 prop 重点在于函数参数类型的注解

```tsx
type Props = {
  onGetMsg?: (msg: string) => void;
};

function Son(props: Props) {
  const { onGetMsg } = props;
  return (
    <button onClick={() => onGetMsg?.("this is string msg")}>send msg</button>
  );
}
```

说明：
1. 在组件内部调用时需要遵守类型的约束，参数传递需要满足要求
2. 绑定 prop 时如果绑定内联函数直接可以推断出参数类型，否则需要单独注解匹配的参数类型

### useRef

获取 dom 的场景，可以直接把要获取的 **<font color="#1565c0">dom元素的类型当成泛型参数传递给useRef</font>** ,可以推导出 **<font color="#1565c0">.current属性的类型</font>**

```tsx
function App(){
    const domRef = useRef<HTMLInputElement|null>(null)
    useEffect(()=>{
        domRef.current?.focus()
    },[])
    return(
        <>
            <input ref={domRef} />
        </>
    )
}
```
#### 引用稳定的存储器

把useRef当成引用稳定的存储器使用的场景可以通过泛型传入联合类型来做，比如定时器的场景:

```tsx
function App(){
    const timerRef = useRef<number | undefined>(undefined)
    useEffect(()=>{
        timerRef.current = setInterval(()=>{
            console.log('计时器')
        },1000)
        return ()=> clearInterval(timerRef.current)
    },[])

    return <>div</>
}
```

**<font color="#1565c0"></font>**
