import {BinaryExpr,LiteralExpr,VariableExpr,GroupingExpr} from './ast.js';

export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    // advance(){
    //     return this.tokens[this.current++];
    // }

    match(...types){
        for(const type of types){
            if(this.tokens[this.current].type === type){
                return true;
            }
        }
        return false;
    }

    isAtEnd(){
        return this.tokens[this.current].type === 'EOF';
    }

    parse() {
        return this.expression();
    }
    expression(){
        return this.equality();
    }
    equality(){
        let expr = this.comp();
    }
    comp(){
        let expr = this.term();
    }
    term(){
        let expr = this.factor();
    }
    factor(){
        let expr = this.unary();
    }
    unary(){
        return this.primary();
    }
    primary(){
        if(this.match("NUMBER")){
            return new LiteralExpr(this.tokens[this.current].literal)
        }

        throw new Error("miniJS: Expected expression")
    }
}



