// The semantic analyzer

const {
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
} = require('../ast');
const { NumType, StringType, NilType } = require('./builtins');
const check = require('./check');
const Context = require('./context');

module.exports = function(exp) {
  exp.analyze(Context.INITIAL);
};

List.prototype.analyze = function(context) {
  this.memberType = context.lookup(this.memberType);
};

Assignment.prototype.analyze = function(context) {
  this.source.analyze(context);
  this.target.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
};

BinaryExp.prototype.analyze = function(context) {
  this.left.analyze(context);
  this.right.analyze(context);
  if (["<=" , ">=" , ">" , "<"].includes(this.op)) {
    check.isNum(this.left);
    check.isNum(this.right);
      this.type = BoolLit;
  } else if (["and", "or"].includes(this.op)) {
    check.isBoolean(this.left);
    check.isBoolean(this.right);
    this.type = BoolLit;
  } else if (["-", "+", "^", "/", "*"].includes(this.op)) {
     check.isNum(this.left);
     check.isNum(this.right);
     this.type = NumLit;
   } else {
    check.expressionsHaveTheSameType(this.left, this.right);
       this.type = NumType;
  }
};

BoolLit.prototype.analyze = function(context) {
  this.type = BoolLit;
};

ClassDec.prototype.analyze = function(context) {
  context.add(this.function);
   this.function.analyze(context.createChildContextForFunctionBody(this));
};

Case.prototype.analyze = function(context) {
  this.test.analyze(context);
    const bodyContext = createChildContextForBlock();
    this.body.forEach(s => s.analyze(bodyContext));
};
//needs rework
DebugPrint.prototype.analyze = function(context) {
  this.id = context.lookup(this.id);
  //  this.id.analyze(context);
};

DictExpression.prototype.analyze = function(context) {
 //this.termList.forEach((item) => {
 //   item.analyze(context);
 // });
  if (this.termList.length) {
      const keyType = this.termList[0].key;
      const valueType = this.termList[0].value;
      this.type = new DictTerm(keyType, valueType);
      for (let i = 1; i < this.termList.length; i += 1) {
        check.sameType(this.termList[i].key.type, this.type.keyType);
        check.sameType(this.termList[i].value.type, this.type.valueType);
      }
  }
};

DictTerm.prototype.analyze = function(context) {
 this.termList.items.forEach((item) => {
    item.key.analyze(context);
    item.value.analyze(context);
  });
};

List.prototype.analyze = function(context) {
};

ForLoop.prototype.analyze = function(context) {
  const bodyContext = context.createChildContextForLoop();
  const iterableType = this.iterable.analyze(bodyContext);
  if (iterableType.isString() || iterableType.isBoolean()) {
    throw new Error('for loop object must be a iterable.');
  }
  this.body.analyze(bodyContext);
};


// Function analysis is broken up into two parts in order to support (nutual)
// recursion. First we have to do semantic analysis just on the signature
// (including the return type). This is so other functions that may be declared
// before this one have calls to this one checked.
FuncDec.prototype.analyzeSignature = function(context) {
  this.bodyContext = context.createChildContextForFunctionBody();
  this.function.params.forEach(p => p.analyze(this.bodyContext));
  this.returnType = !this.function.returnType ? undefined : context.lookup(this.function.returnType);
};

FuncDec.prototype.analyze = function() {
  this.function.analyze(this.bodyContext);
  check.isAssignableTo(this.function.body, this.returnType, 'Type mismatch in function return');
  delete this.bodyContext; // This was only temporary, delete to keep output clean.
};

FunctionObject.prototype.analyze = function(context) {

  if (this.body) {
    this.body.forEach(s => s.analyze(context));
  }
};

FuncCall.prototype.analyze = function(context) {
  this.callee = context.lookup(this.callee);
  check.isFunction(this.callee, 'Attempt to call a non-function');
  this.args.forEach(arg => arg.analyze(context));
  check.legalArguments(this.args, this.callee.params);
  this.type = this.callee.returnType;
};


IdExp.prototype.analyze = function(context) {
    console.log(context);
  this.ref = Context.lookup(this.ref);
  this.type = this.ref.type;
};

IfStatement.prototype.analyze = function(context) {
  this.cases.forEach(testCases => {
    testCases.test.analyze(context);
    check.isBoolean(testCases.test);
  });
  this.cases.forEach(testCases => {
    const blockContext = context.createChildContextForBlock();
    testCases.body.forEach(statement => statement.analyze(blockContext));
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.forEach(s => s.analyze(alternateBlock));
  }
};

ListExp.prototype.analyze = function(context) {
  this.termList.forEach(m => m.analyze(context));
  if (this.termList.length) {
    this.type = new List(this.termList[0].type);
    for (let i = 1; i < this.termList.length; i += 1) {
      check.sameType(this.termList[i].type, this.type);
    }
  }
};

NumLit.prototype.analyze = function(context) {
    this.type = NumType;
};

MethodCall.prototype.analyze = function(context) {
//TO DO
};

Nil.prototype.analyze = function() {
  this.type = NilType;
};

Subscripted.prototype.analyze = function(context) {
  this.v.analyze(context);
  check.isListOrDict(this.v);
  this.subs.analyze(context);
  check.isNum(this.subscript);
  this.type = this.v.type.memberType;
};

Param.prototype.analyze = function(context) {
  this.type = context.lookup(this.type);
  context.add(this.id, this);
};

Program.prototype.analyze = function(context) {
  this.statements.forEach((stmt) => {
    stmt.analyze(context);
  });
};

PrintStatement.prototype.analyze = function(context) {
  this.exp.analyze(context);
};

ReturnStatement.prototype.analyze = function(context) {
  if (this.returnValue) {
    this.returnValue.analyze(context);
  }
  context.assertInFunction('Return statement outside function');
};

StrLit.prototype.analyze = function(context) {
    this.type = StringType;
};

UnaryExp.prototype.analyze = function(context) {
    this.operand.analyze(context);
    if (["!", "not"].includes(this.op)) {
      check.isBoolean(this.operand);
      this.type = BooleanType;
    } else {
      check.isNumber(this.operand);
      this.type = NumType;
    }
};

Variable.prototype.analyze = function(context) {
    this.value = context.lookup(this.id);
};

VariableDec.prototype.analyze = function(context) {
  this.init.analyze(context);
  if (this.type) {
    this.type = context.lookup(this.type);
    check.isAssignableTo(this.init, this.type);
  } else {
    // Yay! type inference!
    this.type = this.init.type;
  }
  context.add(this.id, this);
};

WhileExp.prototype.analyze = function(context) {
  this.test.analyze(context);
  const bodyContext = context.createChildContextForLoop();
  this.body.forEach(s => s.analyze(bodyContext));
};
