---
title: Covariance & Contravariance & Bivariance
categories: 
- [Web -- Knowledge is infinite,前端,TypeScript]
tag: TypeScript
---
# Covariance & Contravariance & Bivariance
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

