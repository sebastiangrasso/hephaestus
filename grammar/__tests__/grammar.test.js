/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
 custom type circle:
   num x
   num y
   string color = ""
---
void helloWorld():
    print: "Hello World"
---
custom type greekGod:
    list<string> parents
    string symbol
    string power
    num childrenCount
    
    string summary():
        return (symbol + power)
    ---
---
num celsiusToFarenheit(num celsius):
    num farenheit = (celsius * 9 /5 + 32)
    return farenheit
---
# Variable Declarations + Assignment
 
 num x
 x = 7
 num temp = 660

 string name
 string unit = "Celsius"

 bool fireproof = true

 list<string> powers = ["Fire", "Craftsmanship", "Metalwork"]
 list<num> count = [1,2,3,4,5]

 dict<string; string> godsToChildren = {"Apollo";"Orpheus", "Posideon";"Orion", "Zeus";"Hercules"}
 dict<num; bool> primes = {4;no, 5;yes, 6;no, 7;yes, 8;no}

 custom type greekGod:
     list<string> parents
     string symbol = "hammer"
     string power = "metalurgy"
     num childrenCount
     
     string summary():
         return (symbol + power)
     ---
 ---

 # Loops

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

 # Functions
 
 void helloWorld(string name):
     print: ("Hello" + name)
 ---
 
 num celsiusToFarenheit(num celsius):
     num farenheit = (celsius * 9 / 5 + 32)
     return farenheit
 ---

`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', done => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});
