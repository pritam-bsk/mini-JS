import { Lexer } from "./lexer.js";

const source = 
`
// This is a comment
let x = 42;
if (x >= 10) {
    print("x is big!");
} else {
    x = x + 1;
}

// arithmetic and comparison
y = (x - 3) * 2 / 5;
z = y != 0 && y < 10;

`

const lexer = new Lexer(source)
console.log(lexer.scanTokens());