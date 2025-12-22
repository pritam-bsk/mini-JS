import { Lexer } from "./lexer.js";
import { Parser } from "./parse.js";
import { Interpreter } from "./interpreter.js";

const source = 
`
print 1 + 2 * 3;
print (1 + 2) * 3;
print 10 / 2 / 5;

`

const lexer = new Lexer(source);
// console.log(lexer.scanTokens());

const parser = new Parser(lexer.scanTokens());
const statements = parser.parse();
// console.log(statements);

new Interpreter(statements).Interpret();
