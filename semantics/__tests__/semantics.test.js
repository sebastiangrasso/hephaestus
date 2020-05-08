/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require('../../ast/parser');
const analyze = require('../analyzer');


const program = String.raw`
num fibonacci(num x):
if (x < 1):
return 1 ---
return fibonacci(x+2)
---
print: (fibonacci())
print: (fibonacci(988))
`;

describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', done => {
    const astRoot = parse(program);
       console.log(astRoot);
    expect(astRoot).toBeTruthy();
       console.log(analyze(astRoot));
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});
