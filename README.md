# Hephaestus
## Introduction
Hephaestus was the Greek god of fire, metallurgy, forges and scultpture. Perhaps the most famous of his numerous inventions was the creation of "Automatons", or metal sculptures animated to perform tasks for him. This is where our language earns it's namesake. A strong, statically typed language, Hephaestus gives programmers the ability to elegantly craft programs to make computers do the work for them. It's pythonic speech-like syntax makes learning the language easy and it's large access to math operations makes it a great alternative for AI/data science applications. Learn Hephaestus and make you're machine come to life!

## Features
- Strong, Static Typing
- Debug Printing (useful for finding mistakes in complex calculations involving manipulations of variables)
- Optional Parameters
- Iterable objects with For Loops (like python)
- String Interpolation
- Dictionaries/Lists
- Custom object/class creation

## Types
- String
```
string name
string unit = "Celsius"
```
- Num
 ```
 num x
 x = 7
 num temp = 660
 ```
- Boolean

```
bool fireproof = true
```
- Dict
```
dict<string; string> godsToChildren = {"Apollo";"Orpheus", "Posideon";"Orion", "Zeus";"Hercules"}
dict<num; bool> primes = {4;no, 5;yes, 6;no, 7;yes, 8;no}
```
- List
```
list<string> powers = ["Fire", "Craftsmanship", "Metalwork"]
list<num> count = [1,2,3,4,5]
```
- Custom Classes
```
custom type greekGod:
     list<string> parents
     string symbol = "hammer"
     string power = "metalurgy"
     num childrenCount
     
     string summary():
         return (symbol + power)
     ---
 ---
 ```
 ## Loops
```
 for x in 20:
     for y in 10:
         return (x*y)
     ---
 ---

 for name in gods:
     print:(name)
 ---

 while (angry == true):
     for demigod in children:
         print:("I demand a sacrfice!")
     ---
 ---
```
## Functions
```
void helloWorld(string name):
     print: ("Hello" + name)
 ---
 ```
 ```
 num celsiusToFarenheit(num celsius):
     num farenheit = (celsius * 9 / 5 + 32)
     return farenheit
 ---
```
```
num fibonacci(num x):
if (x < 1):
return 1 ---
return (fibonacci(x-1) + fibonacci(x-2)
---
```
``` javascript
function fibonacci(x) {
    if (x <= 1) {
        return x;
    }
    return fibonacci(x - 1) + fibonacci(x - 2);
}
```
