import { Lexer } from "./lexer.js";
import { Parser } from "./parse.js";

const source = 
`
(1+x)*3

`

const lexer = new Lexer(source)
console.log(lexer.scanTokens());

const parser = new Parser(lexer.scanTokens());
const ast = parser.parse();
console.log(ast);
