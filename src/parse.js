import { BinaryExpr, LiteralExpr, VariableExpr, GroupingExpr, AssignExpr } from './ast.js';
import { PrintStmt, ExpressionStmt, VarStmt } from './stmt.js';

export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    match(...types) {
        for (const type of types) {
            if (this.tokens[this.current].type === type) {
                return true;
            }
        }
        return false;
    }

    isAtEnd() {
        return this.tokens[this.current].type === 'EOF';
    }

    parse() {
        const statements = [];
        while (!this.isAtEnd()) {
            statements.push(this.statement());
        }
        return statements;
    }
    statement() {
        if (this.match("PRINT")) {
            this.current++;
            return this.printStatement();
        }
        if (this.match("LET")) {
            this.current++;
            return this.varStatement();
        }
        return this.expressionStatement();
    }

    varStatement() {
        const nameToken = this.tokens[this.current];
        if (this.match("IDENTIFIER")) {
            this.current++;
        } else {
            throw new Error(`expected variable name at line ${this.tokens[this.current].line}`);
        }

        let initializer = null;
        if (this.match("EQUAL")) {
            this.current++;
            initializer = this.equality();
        }

        if (this.match("SEMICOLON")) {
            this.current++;
        } else {
            throw new Error(`expected ';' at line ${this.tokens[this.current].line}`);
        }

        return new VarStmt(nameToken.lexeme, initializer);
    }

    printStatement() {
        const value = this.equality();
        if (this.match("SEMICOLON")) this.current++;
        else throw new Error(`expected ';' at line ${this.tokens[this.current].line}`);
        return new PrintStmt(value);
    }
    expressionStatement() {
        const value = this.equality();
        if (this.match("SEMICOLON")) this.current++;
        else throw new Error(`expected ';' at line ${this.tokens[this.current].line}`);
        return new ExpressionStmt(value);
    }

    equality() {
        let expr = this.comparison();
        while (this.match("EQUAL_EQUAL")) {
            this.current++;
            expr = new BinaryExpr(expr, this.tokens[this.current - 1], this.comparison());
        }

        if (this.match("EQUAL")) {
            this.current++;
            const value = this.equality();

            if (expr.type === "Variable") {
                return new AssignExpr(expr.name, value);
            }

            throw new Error("Invalid assignment target.");
        }
        return expr;
    }

    comparison() {
        let expr = this.term();
        while (this.match("GREATER", "GREATER_EQUAL", "LESS", "LESS_EQUAL")) {
            this.current++;
            expr = new BinaryExpr(expr, this.tokens[this.current - 1], this.term());
        }
        return expr;
    }
    term() {
        let expr = this.factor();
        while (this.match("PLUS", "MINUS")) {
            this.current++;
            expr = new BinaryExpr(expr, this.tokens[this.current - 1], this.factor());
        }
        return expr;
    }
    factor() {
        let expr = this.unary();
        while (this.match("STAR", "SLASH")) {
            this.current++;
            expr = new BinaryExpr(expr, this.tokens[this.current - 1], this.unary());
        }
        return expr;
    }
    unary() {
        if (this.match("MINUS")) {
            return new BinaryExpr(new LiteralExpr(0), this.tokens[this.current], this.unary());
        }
        return this.primary();
    }
    primary() {
        if (this.match("NUMBER")) {
            this.current++;
            return new LiteralExpr(this.tokens[this.current - 1].literal)
        }
        if (this.match("IDENTIFIER")) {
            this.current++;
            return new VariableExpr(this.tokens[this.current-1].lexeme)
        }
        if (this.match("LEFT_PAREN")) {
            this.current++;
            const expr = this.equality();
            if (this.tokens[this.current].type === "RIGHT_PAREN") { this.current++ }
            else throw new Error(`miniJS: expected ')' at line ${this.tokens[this.current].line}`)
            return new GroupingExpr(expr);
        }
        this.current++;
        throw new Error("miniJS: Expected expression")
    }
}



