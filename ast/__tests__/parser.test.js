/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require('../parser');

const {
  Assignment,
  BinaryExp,
  BoolLit,
  Case,
  ClassDec,
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
    Subscripted,
  StrLit,
  UnaryExp,
  Variable,
  VariableDec,
  WhileExp,
} = require('../../ast');

const fixture = {
hello: [String.raw`print:"Hello, world"`, new Program([new PrintStatement(new StrLit('Hello, world'))])],

fibonacci: [
       String.raw`num fibonacci(num x): if (x <= 1): return 1 --- return (fibonacci(x - 1) + fibonacci(x - 2)) --- print: fibonacci(0) print: fibonacci(100)`,
       new Program(
                   [new FuncDec(
                                'num',
                                'fibonacci',
                                [[new Param('num', 'x')]],
                                [new IfStatement([ new Case(
                                                 new BinaryExp(
                                                               '<=',
                                                               new IdExp('x'),
                                                               new NumLit(1)
                                                               ),
                                                 [new ReturnStatement(
                                                                      [new NumLit(1)]
                                                                      )
                                                  ]
                                                 )], null
                                                 ),
                                 new ReturnStatement(
                                                     [new BinaryExp('+',
                                                         new FuncCall(
                                                                      'fibonacci',
                                                                      [new BinaryExp(
                                                                                     '-',
                                                                                     new IdExp('x'),
                                                                                     new NumLit(1)
                                                                                     )
                                                                       ]
                                                                      ),
                                                        new FuncCall(
                                                                     'fibonacci',
                                                                      [new BinaryExp(
                                                                                     '-',
                                                                                     new IdExp('x'),
                                                                                     new NumLit(2)
                                                                                    )
                                                                                  ]
                                                                                 )
                                                                )
                                                      ]
                                                     )
                                 ]
                                ),
                    new PrintStatement(
                                       new FuncCall(
                                                    'fibonacci',
                                                    [new NumLit(0)])),
                    new PrintStatement(
                                       new FuncCall(
                                                    'fibonacci',
                                                    [new NumLit(100)]))
                    
                    ]
                   ),
     ],
whileloop: [String.raw`num x x = 7while (x > 3): dbprint: x x = -x ---`,
            new Program([
                         new Variable('num', 'x'),
                         new Assignment(
                                        new IdExp('x'),
                                        new NumLit(7)
                                        ),
                         new WhileExp(
                                      new BinaryExp(
                                                    '>',
                                                    new IdExp('x'),
                                                    new NumLit(3)
                                                    ),
                                      [new DebugPrint('x'),
                                       new Assignment(
                                                      new IdExp('x'),
                                                      new UnaryExp('-', new IdExp('x'))
                                                      )
                                      ]
                                      )
                        ])
            ],
doubleloops: [String.raw` for x in 20: for y in 10: return (x*y) --- ---`,
        new Program(
                    [new ForLoop(new IdExp('x'),
                                 new NumLit(20),
                                 [new ForLoop(new IdExp('y'),
                                              new NumLit(10),
                                              [new ReturnStatement([
                                                                    new BinaryExp(
                                                                                  '*',
                                                                                  new IdExp('x'),
                                                                                  new IdExp('y')
                                                                                  )
                                                                    ])
                                              ])
                                 ])
                    ])],
    
dictionary: [String.raw` dict<num; bool> primes = {4;false, 5;true, 6;false, 7;true, 8;false}`,
             new Program([
                         new VariableDec(
                                         'primes',
                                         new DictTerm('num', 'bool'),
                                         new DictExpression([[
                                         new DictTerm(new NumLit(4), new BoolLit(false)),
                                         new DictTerm(new NumLit(5), new BoolLit(true)),
                                         new DictTerm(new NumLit(6), new BoolLit(false)),
                                         new DictTerm(new NumLit(7), new BoolLit(true)),
                                         new DictTerm(new NumLit(8), new BoolLit(false))
                                          ]])
                                         )])
             ],

customClass: [String.raw`  custom type circle: num radius bool round = true string color = ""---`,
    new Program(
                [
                new ClassDec(
                             'circle',
                             [
                             new Variable('num', 'radius'),
                             new VariableDec('round', 'bool', new BoolLit(true)),
                             new VariableDec('color', 'string', new StrLit(""))
                             ])])
    ],

listTest: [String.raw`list<num> primes = [3, 5, 7, 11, 13] if ((primes.length() > 10) or (primes.length() < 3)): num firstAndSecond = primes[1]^ primes[2] ---`,
    new Program(
                [
                new VariableDec(
                                'primes',
                                 new List('num'),
                                 new ListExp(
                                             [
                                             new NumLit(3),
                                              new NumLit(5),
                                              new NumLit(7),
                                              new NumLit(11),
                                              new NumLit(13)
                                              ]
                                             )
                                ),
                 new IfStatement(
                                 [
                                 new Case(
                                          new BinaryExp(
                                                        'or',
                                                        new BinaryExp(
                                                                      '>',
                                                                      new MethodCall(
                                                                                     new IdExp('primes'),
                                                                                     new FuncCall('length', null)),
                                                                      new NumLit(10)
                                                                      ),
                                                        new BinaryExp(
                                                                      '<',
                                                                      new MethodCall(
                                                                                     new IdExp('primes'),
                                                                                     new FuncCall('length', null)),
                                                                      new NumLit(3)
                                                                      )
                                                        ),
                                          [
                                          new VariableDec(
                                                          'firstAndSecond',
                                                          'num',
                                                          new BinaryExp(
                                                                        '^',
                                                                        new Subscripted(new IdExp('primes'), new NumLit(1)
                                                                                        ),
                                                                        new Subscripted(new IdExp('primes'), new NumLit(2)
                                                                                        )
                                                                        )
                                                          )
                                           ]
                                          )
                                  ], null
                                 )
                 
                 ]
                )
    ],
    

};

describe('The parser', () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
     // console.log(parse(source));
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test('throws an exception on a syntax error', done => {
    expect(() => parse('as$df^&%*$&')).toThrow();
    done();
  });
});
