const util = require('util');
const { List, FuncDec, IdExp, NumLit, StrLit, BoolLit, ListExp, DictExpression, DictTerm } = require('../ast');
const { NumType, StringType, NilType } = require('./builtins');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isListType(type) {
    doCheck(type.constructor === List, 'Not a list type');
  },
  
  isDictType(expression) {
    doCheck(expression.type.constructor === DictTerm, 'Not a dictionary type');
  },

  isList(expression) {
    doCheck(expression.type.constructor === ListExp, 'Not an list');
  },

  isDict(expression) {
    doCheck(expression.type.constructor === DictExpression, 'Not a dictionary');
  },

  isNum(expression) {
    doCheck(expression.type === NumType, 'Not an num');
  },
    
  isBoolean(expression) {
      doCheck(expression.type === BoolLit, 'Not an boolean');
    },

  mustNotHaveAType(expression) {
    doCheck(!expression.type, 'Expression must not have a type');
  },

  isNumberOrString(expression) {
    doCheck(
      expression.type === NumType || expression.type === StringType,
      'Not an integer or string'
    );
  },

  isFunction(value) {
    doCheck(value.constructor === FuncDec, 'Not a function');
  },

  expressionsHaveTheSameType(e1, e2) {
    doCheck(e1.type === e2.type, 'Types must match exactly');
  },

  // Can we assign expression to a variable/param/field of type type?
  isAssignableTo(expression, type) {
    doCheck(
      (expression.type === NilType && type.constructor === DictTerm) || (JSON.stringify(expression.type) === JSON.stringify(type)),
      `Expression of type ${util.format(expression.type)} not compatible with type ${util.format(
        type
      )}`
    );
  },

  inLoop(context, keyword) {
    doCheck(context.inLoop, `${keyword} can only be used in a loop`);
  },

  // Same number of args and params; all types compatible
  legalArguments(args, params) {
    doCheck(
      args.length === params.length,
      `Expected ${params.length} args in call, got ${args.length}`
    );
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },

};
