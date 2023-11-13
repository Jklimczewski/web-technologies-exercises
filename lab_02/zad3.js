function defFun(fun, types) {
  fun.typeConstr = types;
  return fun;
}

function appFun(f, arg1, arg2, ...args) {
  if (f.hasOwnProperty("typeConstr")) {
    const arguments = [arg1, arg2, ...args];
    if (arguments.length !== f.typeConstr.length) {
      throw {
        typerr: `Wrong number of arguments. Expected ${f.typeConstr.length}, got ${arguments.length}`,
      };
    }
    arguments.forEach((el, index) => {
      if (typeof el !== f.typeConstr[index]) {
        throw {
          typerr: `Argument ${el} is of the wrong type. Expected ${
            f.typeConstr[index]
          }, got ${typeof el}.`,
        };
      }
    });
    return f(...arguments);
  }
}

const myfun = defFun((a, b) => a + b, ["number", "number"]);

try {
  console.log(appFun(myfun, 12, 15));
} catch (e) {
  console.log(e.typerr);
}
