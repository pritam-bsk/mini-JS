export class Interpreter {
    constructor(statements){
        this.statements = statements;
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

        throw new Error("Unknown expression");
    }
}