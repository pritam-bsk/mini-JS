import { Environment } from './enviroment.js';
export class Interpreter {
    constructor(statements) {
        this.statements = statements;
        this.environment = new Environment();
    }
    Interpret() {
        for (const stmt of this.statements) {
            this.execute(stmt);
        }
    }

    execute(stmt) {
        if (stmt.type === 'PrintStmt') {
            console.log(this.evaluate(stmt.expression));
        } else if (stmt.type === 'ExpressionStmt') {
            this.evaluate(stmt.expression);
        } else if (stmt.type === 'VarStmt') {
            let value = null;
            if (stmt.initializer !== null) {
                value = this.evaluate(stmt.initializer);
            }
            this.environment.values.set(stmt.name, value);
        }
    }
    evaluate(expr) {
        if (expr.type === "Literal") return expr.value;

        if (expr.type === "Grouping") {
            return this.evaluate(expr.expression);
        }

        if (expr.type === "BinaryExpression") {
            const left = this.evaluate(expr.left);
            const right = this.evaluate(expr.right);

            switch (expr.operator.type) {
                case "PLUS": return left + right;
                case "MINUS": return left - right;
                case "STAR": return left * right;
                case "SLASH": return left / right;
            }
        }

        if (expr.type === "Variable") {
            return this.environment.get(expr.name);
        }

        if (expr.type === 'Assign') {
            let value = this.evaluate(expr.value)
            // console.log(expr.name);
            this.environment.assign(expr.name, value);
            return value;
        }

        throw new Error("Unknown expression");
    }
}