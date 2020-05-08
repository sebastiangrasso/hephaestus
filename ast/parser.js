/*
 * Parser module
 *
 *   const parse = require('./parser');
 *
 *   parse(text)
 *       Returns the abstract syntax tree for the given program text. This
 *       function will first pre-parse (figure out indents and dedents),
 *       then match against an Ohm grammar, then apply AST generation
 *       rules. If there are any errors, this function will throw an error.
 */

const fs = require("fs");
const ohm = require("ohm-js");
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
    IdExp,
    IfStatement,
    ListExp,
    NumLit,
    Nil,
    MethodCall,
    Param,
    PrintStatement,
    Program,
    ReturnStatement,
    StrLit,
    Subscripted,
    UnaryExp,
    Variable,
    VariableDec,
    WhileExp,
} = require('../ast');

const grammar = ohm.grammar(fs.readFileSync("./grammar/hephaestus.ohm"));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.
function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

const astGenerator = grammar.createSemantics().addOperation('ast', {

  Program(Statement) { return new Program(Statement.ast()); },
 
 //var declarations and functions maybe cant be grouped together
 ClassDec(_1, id, _2, varsAndFuncDec, _3) {
    return new ClassDec(
      id.ast(),
      varsAndFuncDec.ast(),
    );
  },
                                                            
  FuncDec(type, id, _1, params, _2, body, _3) {
    return new FuncDec(
      type.ast(),
      id.ast(),
      params.ast(),
      body.ast(),
    );
  },
                                                            
  VarDec_withValue(type, id, _2, exp) { return new VariableDec(id.sourceString, type.ast(), exp.ast()); },
  VarDec_noValue(type, id) { return new Variable(type.ast(), id.sourceString); },
  
  Param(type, id) {
    return new Param(type.ast(), id.ast()); },

  Exp_or(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp_and(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp1_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp2_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp3_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp4_binary(left, op, right) {
    return new BinaryExp(op.ast(), left.ast(), right.ast());
  },
  Exp5_prefix(op, exp) {
    return new UnaryExp(op.ast(), exp.ast());
  },
//  Exp6_dec(op, exp) {
   // return new DecrementExp(op.ast(), exp.ast());
  //},
  Exp6_parens(_1, exp, _2) { return exp.ast(); },
  Exp6_id(id) { return new IdExp(id.sourceString); },
  Exp6_subscripted(list, _1, subscript, _2) {
    return new Subscripted(list.ast(), subscript.ast());
  },
  Exp6_list(_1, exp, _2) { return new ListExp([...exp.ast()]); },
  Exp6_dict(_1, firstType, _2) {
    return new DictExpression([firstType.ast()]);
  },
  Dictionary(_1, firstType, _2, secondType, _3) { return new DictTerm(firstType.ast(), secondType.ast()); },
  DictTerm(id, _, Exp) { return new DictTerm(id.ast(), Exp.ast()); },

  FuncCall(id, _1, exps, _2) { return new FuncCall(id.sourceString, arrayToNullable(exps.ast())); },
  Assignment(v, _, e) {
    return new Assignment(new IdExp(v.sourceString), e.ast());
  },//may have to group vars and funcDec

  Return(_, exp) { return new ReturnStatement(exp.ast()); },
  Exps(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  ForStatement(_1, id, _2, iterable, _4, body, _6) {
    const tempId = new IdExp(id.ast());
    return new ForLoop(tempId, iterable.ast(), body.ast());
  },
                                                            
  Exp6_methodCall(object, _1, call) { return new MethodCall(object.ast(), call.ast()); },
  WhileStatement(_1, test, suite, _2) { return new WhileExp(test.ast(), suite.ast()); },
  Conditionals(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite, _4, _5, _6) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const bodies = [firstSuite.ast(), ...moreSuites.ast()];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IfStatement(cases, arrayToNullable(lastSuite.ast()));
  },
  Condition(_1, exp, _2) { return exp.ast(); },
  PrintStatement_print(_, e) { return new PrintStatement(e.ast()); },
  PrintStatement_debugPrint(_, varId) { return new DebugPrint(varId.ast()); },
  BoolLit(_) { return new BoolLit(this.sourceString === 'true'); },
  NumLit(_1, _2, _3) { return new NumLit(+this.sourceString); },
  StrLit(_1, chars, _6) { return new StrLit(chars.sourceString); },
  List(_1, type, _3) { return new List(type.ast()); },
  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  EmptyListOf() { return []; },
  id(_1, _2) { return this.sourceString; },
  _terminal() { return this.sourceString; },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
