---
title: TypeScript
categories: 
- [Web -- Knowledge is infinite,前端,TypeScript]
tag: TypeScript
---
# TypeScript
## keyof 
返回一个由对象 key 组成的联合类型
```typescript
type ObjectTypeA = { a: number; b: string; c: boolean };
type UnionTypeA = keyof ObjectTypeA; //"a" | "b" | "c"
const unionTypeA: UnionTypeA = "a";
```
## in
类似 for ... in 对右侧的字面量联合类型进行遍历赋值到左侧的变量上
```typescript
type ToPartial<T> = { [k in keyof T]?: T[k] };
type ResToPartial = ToPartial<ObjectTypeA>;
```
## ?
将对象属性设置为可选
```typescript
type ToPartial<T> = { [k in keyof T]?: T[k] };
type ResToPartial = ToPartial<ObjectTypeA>;
```
## readonly
设置对象属性为只读
```typescript
type ToReadOnly<T> = { readonly [k in keyof T]: T[k] };
type ResToReadOnly = ToReadOnly<ObjectTypeA>;
```
## -
去除修饰符，例如 -? ， -readonly
## -?
去除可选状态
```typescript
type ToRequired<T> = { [K in keyof T]-?: T[K] };
type ResToRequired = ToRequired<ResToPartial>;
```
## as
类型断言，可以通过 as  进行断言和分布式类型拆解的子类型引用
```typescript
type ToOmit<T, K extends string | number | symbol> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type ResToOmit = ToOmit<ObjectTypeA, "a">;
```
## extends
既可以作为接口继承使用，也可以作为条件判断表达式使用
```typescript
type ToRecord<K extends string | number | symbol, T> = { [P in K]: T };
type ResToRecord = ToRecord<"a" | "b", { name: string; id: number }>;
type ToExclude<T, K> = T extends K ? never : T;
type ResToExclude = ToExclude<UnionTypeA, "a">;
```
## infer 
可以动态推断类型，并返回推断出的类型，写出来就清楚了
```typescript
class ClassA {
  a: number;
  b: string;
  constructor(name?: string, age?: number) {}
}

type GetClassParamsType<T extends new (...args: any) => any> = T extends new (
  ...args: infer Params
) => any
  ? Params
  : never;
type ClassAParamsType = GetClassParamsType<typeof ClassA>;
```
## & Intersection 交叉类型
取所有交叉接口属性类型合集，接口类型中重复 key 的类型不同则为 never 类型
```typescript
type ObjectTypeA = { a: string; b: number; c: boolean } & {
  a: number;
  b: string;
};
const obj: ObjectTypeA = { a: 2, b: "2", c: true };
//"a" 和 "b" 会报不能将类型“xxx”分配给类型“never”
```
字面量交叉类型会返回 never
```typescript
type UnionTypeB = "a" & "b" & "c";
const obj: UnionTypeB = "a";
//不能将类型“string”分配给类型“never”
```
## | Union 联合类型
在接口类型中只能满足联合其一
```typescript
type ObjectTypeA =
  | { a: number; b: string; c: boolean }
  | { a: boolean; b: number }
  | { a: string };
const obj: ObjectTypeA = { a: 2, b: "2", c: true };
//可以
const obj: ObjectTypeA = { a: true, b: 2, c: true };
//“c”不在类型“{ a: boolean; b: number }”中
const obj: ObjectTypeA = { a: ‘12’, b: 2, c: true };
//"b",“c”不在类型“{ a: string; }”中

```
在字面量类型中取分布式类型
```typescript
type UnionTypeB = "a" | "b" | "c";
const obj: UnionTypeB = "a" || "b";
```
## namespace
可以把相似的类型或者说一批类型放进一个命名空间中导出，这样在使用的时候可以进行模块导入，不仅方便使用还解决了不同类型模块的命名兼容性问题
## 分布式类型
当向泛型中传入联合类型进行 extends 判断时，会进行分配式判断，会把传入的联合类型拆开逐个与 extends 后的类型判断，类似 Exclude 工具类型
```javascript
type ToExclude<T, K> = T extends K ? never : T; // 分布式类型 传入联合类型 T 会与 extends 后的类型逐个判断
type test = ToExclude<"a" | "b" | "c", "b" | "a">; //"c"

```
## Covariance & Contravariance & Bivariance
这三者都是用来确定函数传入的参数为函数时，这个参数函数的参数类型
```javascript
class Animal {}

class Dog extends Animal {}

class Greyhound extends Dog {}
```
### Covariance
Covariance 协变，指的是函数参数为函数时，这个参数函数的参数类型只接收同类型或 subType 子类型
```javascript
const acceptDogCovariance = function (value: Covariant<Dog>) { ... }

acceptDogCovariance(new Animal()) // Error, since Animal is a supertype of Dog
acceptDogCovariance(new Dog()) // Ok
acceptDogCovariance(new Greyhound()) // Ok since Greyhound is a subtype of Dog
```
### Contravariance
Contravariance 逆变则是与 Convariance 相反，只接收同类型或 superType 父类型
```javascript
const acceptDogContravariance = function (value: Contravariance<Dog>) { ... }
acceptDogContravariance(new Animal()) // Ok, since Animal is a supertype of Dog
acceptDogContravariance(new Dog()) // Ok
acceptDogContravariance(new Greyhound()) // Error since Greyhound is a subtype of Dog
```
```javascript
class Animal {
    doAnimalThing(): void {
        console.log("I am a Animal!")
    }
}

class Dog extends Animal {
    doDogThing(): void {
        console.log("I am a Dog!")
    }
}

class Cat extends Animal {
    doCatThing(): void {
        console.log("I am a Cat!")
    }
}


//-----------------------------------------------------------------
function makeAnimalAction(animalAction: (animal: Animal) => void) : void {
    let cat: Cat = new Cat()
    animalAction(cat)
}

function animalAction(animal: Animal) {
    animal.doAnimalThing()
}

makeAnimalAction(animalAction) 
```
### Bivariance
Bivariance 双向协变 则是两者皆可
### Return Type
这些参数函数的返回值默认为 Covariance

## 装饰器
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
### 装饰器总结

1. 装饰器会参与到最终 JS 运行
2. 装饰器的运行时机：**读**到这个类的时候就会立刻被执行
3. 开启 TS 的相关配置可以将 TypeScript 的类型约束作为元数据放入运行时态中，TypeScript 将有机会在运行时态中进行类型约束

![image.png](https://cdn.nlark.com/yuque/0/2023/png/23100954/1699953235426-785cfc83-ae66-4263-a569-ae8853a1094a.png#averageHue=%23757571&clientId=u9da51b4f-06b2-4&from=paste&height=712&id=uuFnj&originHeight=890&originWidth=2484&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=604632&status=done&style=none&taskId=uff38ef63-791d-4e5e-b648-b77d0f99cb5&title=&width=1987.2)
## 类型工具实现
```typescript
type ObjectTypeA = { a: string; b: number; c: boolean };
type UnionTypeA = keyof ObjectTypeA;

type ToPartial<T> = { [k in keyof T]?: T[k] };
type ResToPartial = ToPartial<ObjectTypeA>;

type ToReadOnly<T> = { readonly [k in keyof T]: T[k] };
type ResToReadOnly = ToReadOnly<ObjectTypeA>;

type ToRecord<K extends string | number | symbol, T> = { [P in K]: T };
type ResToRecord = ToRecord<"a" | "b", { name: string; id: number }>;

type ToRequired<T> = { [K in keyof T]-?: T[K] };
type ResToRequired = ToRequired<ResToPartial>;

type ToOnePartial<T, K extends keyof T> = { [P in K]?: T[P] } & {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type ResToOnePartial = ToOnePartial<ObjectTypeA, "a" | "b">;

type ToOmit<T, K extends string | number | symbol> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
type ResToOmit = ToOmit<ObjectTypeA, "a">;

type ToPick<T, K extends keyof T> = { [P in K]: T[P] };
type ResToPick = ToOnePartial<ToPick<ObjectTypeA, "a" | "b">, "a">;

type PickByValueType<T extends object, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K];
};
type ResPickByValueType = PickByValueType<ObjectTypeA, string>;

//联合类型
type ToExclude<T, K> = T extends K ? never : T; // 分布式类型 传入联合类型 T 会与 extends 后的类型逐个判断
type ResToExclude = ToExclude<UnionTypeA, "a">;

type ToExtract<T, K> = T extends K ? T : never;
type ResToExtract = ToExtract<UnionTypeA, "a">;

type NonNullType = null | undefined | "a" | "b";
type ToNonNullable<T> = T extends null | undefined ? never : T;
type ResToNonNullable = ToNonNullable<NonNullType>;

// 函数类型
class ClassA {
  a: number;
  b: string;
  constructor(name?: string, age?: number) {}
}
type GetClassParamsType<T extends new (...args: any) => any> = T extends new (
  ...args: infer Params
) => any
  ? Params
  : never;
type ClassAParamsType = GetClassParamsType<typeof ClassA>;

type GetClassReturnType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer ReturnType
  ? ReturnType
  : never;
type ClassAReturnType = GetClassReturnType<typeof ClassA>;

function functionA(this: number, name: string, age?: string) {
  // this 参数为特殊参数，可以被 infer 筛选掉
  return { a: name, b: age };
}
type GetFunctionParamsType<T extends (...args: any) => any> = T extends (
  ...args: infer Params
) => any
  ? Params
  : never;
type functionAParamsType = GetFunctionParamsType<typeof functionA>;

type GetFunctionReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer ReturnType
  ? ReturnType
  : never;
type functionAReturnType = GetFunctionReturnType<typeof functionA>;

type GetThisParamsType<T> = T extends (
  this: infer ThisType,
  ...args: any
) => any
  ? ThisType
  : unknown;
type functionAThisParamsType = GetThisParamsType<typeof functionA>;

type OmitThisType<T> = unknown extends GetThisParamsType<T> //通过 infer 筛选 this
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
type ResOmitThisType = OmitThisType<typeof functionA>;

```

