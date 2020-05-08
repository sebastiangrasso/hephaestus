const { FuncDec, Param, StrLit, NumLit, BoolLit, Nil } = require('../ast');

const NumType = new NumLit();
const StringType = new StrLit();
const BooleanType = new BoolLit();
const NilType = new Nil();

const standardFunctions = [
  new FuncDec(StringType, 'print:', [new Param(StringType, 's')]),
  new FuncDec(NumType, "length", [new Param(StringType, 's')]),
  ];

const stringFunctions = [
  new FuncDec(StringType, 'substring', [new Param(StringType, 's'), new Param(NumType, 'first'), new Param(NumType, 'second')]),
  new FuncDec(StringType, 'concat', [new Param(StringType, 's'), new Param( StringType, 't')]),
  new FuncDec(StringType, 'charAt', [new Param(StringType, 's'), new Param(NumType, 'i')]),
];

const mathFunctions = [
  new FuncDec(NumType, "abs", [new Param(NumType, "n")]),
  new FuncDec(NumType, "sqrt", [new Param(NumType, "n")]),
  new FuncDec(NumType, "pi", []),
  new FuncDec(NumType, "random", [
    new Param(NumType, "start"),
    new Param(NumType, "end"),
  ]),
  new FuncDec(NumType, "pow", [new Param(NumType, "x"), new Param(NumType, "y")]),
];



const functions = [standardFunctions, stringFunctions, mathFunctions];

functions.forEach(f => {
  f.builtin = true;
});

module.exports = { NumType, StringType, NilType, standardFunctions, stringFunctions, mathFunctions};
