import { Lexer } from "./lexer.js";
import { Parser } from "./parse.js";
import { Interpreter } from "./interpreter.js";

const source = 
`
let a = 10;
let b = a;
let c = b;
print c;

`

const lexer = new Lexer(source);
const tokens = lexer.scanTokens();
// console.log(tokens);

const parser = new Parser(tokens);
const statements = parser.parse();
// console.log(statements);

new Interpreter(statements).Interpret();
