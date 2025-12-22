export class ExpressionStmt{
    constructor(expr){
        this.type = "ExpressionStmt";
        this.expression = expr;
    }
}

export class PrintStmt {
  constructor(expr) {
    this.type = "PrintStmt";
    this.expression = expr;
  }
}