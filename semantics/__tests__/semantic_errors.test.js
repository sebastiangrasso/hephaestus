/*
 * Semantic Error Tests
 *
 * These tests check that the analyzer will reject programs with various
 * static semantic errors.
 */

const parse = require('../../ast/parser');
const Context = require('../context');

const errors = [
  ['use of undeclared variable', 'x = 1'],
 // ['non integer while condition', 'while ("hello"): print:("") ---'],
  ['non integer if condition', 'if ("hello"): print:("")---'],
  ['non integer in add', 'x = 3 + "dog"'],
  ['non integer in subtract', 'x = "dog" - 5'],
  ['types do not match in equality test', 'bool test = (2 == "dog")'],
  ['types do not match in inequality test', 'bool test = (2 <= "dog")'],
  ['types do not match in declaration', 'num x = "string"'],
  ['redeclaration of variable', 'num x = 1 num x = 2'],
  ['type mismatch in assignment', 'num x = 1 num y = "abc"'],
  ['too many function arguments', 'length(1, 2, 3)'],
  ['too few function arguments', 'substring("x")'],
  ['wrong type of function argument', 'x = sqrt("word")'],
  ['subscript of nonarray', 'num x = 3 tst = x[0]'],
  ['call of nonfunction', 'num x = 1 x(5) '],
  ['non integer subscript', 'list<num>nums = [2, 2, 3,3] num save = nums["x"]'],
  // Might need more here, depending on your test coverage report
];

describe('The semantic analyzer', () => {
  errors.forEach(([scenario, program]) => {
    test(`detects the error ${scenario}`, done => {
      const astRoot = parse(program);
      expect(astRoot).toBeTruthy();
      expect(() => astRoot.analyze(Context.INITIAL)).toThrow();
      done();
    });
  });
});

