# mini-JS

A small **JavaScript interpreter** written in pure JavaScript.  
Implements a **lexer**, **parser**, **scope & environment**, **closures**, **call stack**, and **error handling** — all from scratch.


## 🧠 How It Works (at a high level)

1. **Lexer**  
   Converts raw code into a stream of tokens.

2. **Parser**  
   Turns tokens into an AST (Abstract Syntax Tree).

3. **Interpreter**  
   Walks the AST, evaluates expressions/statements in environments.

4. **Scope & Env**  
   Supports nested scopes and closures.

5. **Call Stack**  
   Tracks function calls and execution context.

## 🧩 TODO
- ✅ Lexical analyzer (create tokens)
- ✅ Turn tokens into expression and statements
- ✅ Interpreate statements & minimal error handeling
- ⭕️ Block scope & nested environments
- ⭕️ Controll flow (if/while);
n
- ⭕️ function & call stack

## ⏳ Till now 
- it can handel complex expression
- declaration statements
- assignment statements
- print statements
- Examples: 
```bash
let a = 1; // comment
let b = 2;
print a + (b = 5) * 2; // prints 11;

```
```bash
let a = 10;
let b = a;
let c = b;
print c;
```
```bash
let a = 5;
let b = 3;
a = b = 7;
print a;
print b;
```

## ⭐️ If you find this useful, consider giving it a star!
* Developer: Pritam Basak
* [LinkedIn](https://www.linkedin.com/in/pritam-bsk/)
* [Instagram](https://www.instagram.com/pritam.qy)

