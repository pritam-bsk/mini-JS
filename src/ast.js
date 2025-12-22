export class BinaryExpr {
    constructor(left, operator, right) {
        this.type = 'BinaryExpression';
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

export class LiteralExpr {
    constructor(value) {
        this.type = 'Literal';
        this.value = value;
    }
}

export class VariableExpr {
    constructor(name) {
        this.type = 'Variable';
        this.name = name;
    }
}

export class GroupingExpr {
    constructor(expression) {
        this.type = 'Grouping';
        this.expression = expression;
    }
}

export class AssignExpr {
  constructor(name, value) {
    this.type = "Assign";
    this.name = name;
    this.value = value;
  }
}