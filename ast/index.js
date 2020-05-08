
class Assignment {
  constructor(target, source) {
    Object.assign(this, { target, source });
  }
}

class BinaryExp {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
}

class BoolLit {
  constructor(value) {
      Object.assign(this, { value });
  }
}

class Case {
  constructor(test, body) {
      Object.assign(this, { test, body });
  }
}

class ClassDec {
  constructor(id, params, body) {
    Object.assign(this, { id });
    this.function = new FunctionObject(id, params, body);
  }
}

class DebugPrint {
  constructor(id) {
    Object.assign(this, { id });
  }
}


class DictExpression {
    constructor(termList) {
        Object.assign(this, { termList });
    }
}

class DictTerm {
  constructor(key, value) {
    Object.assign(this, { key, value });
  }
}


class List {
  constructor(type) {
    Object.assign(this, { type });
  }
}

class ForLoop {
  constructor(id, iterable, body) {
      Object.assign(this, { id, iterable, body } );
  }
}

class FuncCall {
    constructor(id, args) {
        Object.assign(this, { id, args });
    }
}

class FuncDec {
  constructor(returnType, id, params, body) {
    Object.assign(this, { id });
      this.function = new FunctionObject(id, params, returnType, body);
  }
}

class FunctionObject {
constructor(id, params, type, body) {
  Object.assign(this, {
    id, params, type, body,
  });
}
}

class IdExp {
  constructor(ref) {
    Object.assign(this, { ref });
  }
}

class IfStatement {
  constructor(cases, alternate) {
    Object.assign(this, { cases, alternate });
  }
}

class ListExp {
  constructor(termList) {
    Object.assign(this, { termList });
  }
}

class NumLit {
  constructor(value) {
    Object.assign(this, { value });
  }
}

class Nil {}

class MethodCall {
constructor(object, call) {
    Object.assign(this, { object, call });
    }
}

class Subscripted {
constructor(v, sub) {
    Object.assign(this, { v, sub });
    }
}

class Param {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }
}


class PrintStatement {
  constructor(exp) {
    Object.assign(this, { exp });
  }
}

class Program {
  constructor(statements) {
    Object.assign(this, { statements });
  }
}

class ReturnStatement {
  constructor(value) {
    Object.assign(this, { value });
  }
}

class StrLit {
  constructor(value) {
    Object.assign(this, { value });
  }
}

class UnaryExp {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }
}

class Variable {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }
}

class VariableDec {
  constructor(id, type, init) {
    Object.assign(this, { id, type, init });
  }
}

class WhileExp {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}

module.exports = {
  Assignment,
  BinaryExp,
  BoolLit,
  ClassDec,
  Case,
  DebugPrint,
  DictExpression,
  DictTerm,
  List,
  ForLoop,
  FuncDec,
  FuncCall,
    FunctionObject,
  IdExp,
  IfStatement,
  ListExp,
  NumLit,
  Nil,
    MethodCall,
    Subscripted,
  Param,
  PrintStatement,
  Program,
  ReturnStatement,
  StrLit,
  UnaryExp,
  Variable,
  VariableDec,
  WhileExp,
};
