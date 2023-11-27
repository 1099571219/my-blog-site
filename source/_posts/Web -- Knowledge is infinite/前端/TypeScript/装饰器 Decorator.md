---
title: 装饰器 Decorator
categories: 
- [Web -- Knowledge is infinite,前端,TypeScript]
tag: TypeScript
date: 2023-11-24
---
# 装饰器 Decorator
```typescript
//类装饰器语法 Class Decorator
@decoratorName
class TestClass{}
//成员装饰器语法 Member Decorator
class TestClass{
  @decoratorName
  public testProp:string
}
//参数装饰器语法 Parmeter Decorator
class TestClass{
  @decoratorName
  public method(
    @decoratorName
    prop:string
  ){}
}
```
### 类装饰器 Class Decorator
类装饰器函数接收一个 target  参数，这个参数就是装饰的类本身
类装饰器有两种返回值：

1. void : 当没有返回值的时候，整个类的行为不会被返回值影响
2. new Class : 装饰器返回一个类的时候，原先类的返回实例会被新的类实例替换返回
### 成员装饰器 Member Decorator
成员装饰器函数接收三个参数：

1. target: 如果装饰器装饰的是静态成员，则 target 是类的本身，如果装饰的是实例成员，则 target 的该类的 prototype
2. key: 代表当前修饰的键值
3. descriptor: 该 key 的属性描述符，可读可写配置等
```typescript
function memberDecorator(
  target: object,
  key:string,
  descriptor: PropertyDescriptor
){}
class Test{
  @memberDecorator
  pbulic propName:string
}
```
### 参数装饰器 Parmeter Decorator
参数装饰器函数接收三个参数：

1. target: 与成员装饰器一致
2. methodName: 代表当前方法的名称
3. index: 被修饰参数在函数参数列表中的索引
```typescript
function parameterDecorator(
  target: object,
  methodName: string,
  index: number
  ){}
class Test {
  public method(
    @parameterDecorator
    param: string
  ){}
}
```
## 总结

1. 装饰器会参与到最终 JS 运行
2. 装饰器的运行时机：**读**到这个类的时候就会立刻被执行
3. 开启 TS 的相关配置可以将 TypeScript 的类型约束作为元数据放入运行时态中，TypeScript 将有机会在运行时态中进行类型约束

![image.png](https://cdn.nlark.com/yuque/0/2023/png/23100954/1699953235426-785cfc83-ae66-4263-a569-ae8853a1094a.png#averageHue=%23757571&clientId=u9da51b4f-06b2-4&from=paste&height=712&id=uuFnj&originHeight=890&originWidth=2484&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=604632&status=done&style=none&taskId=uff38ef63-791d-4e5e-b648-b77d0f99cb5&title=&width=1987.2)
