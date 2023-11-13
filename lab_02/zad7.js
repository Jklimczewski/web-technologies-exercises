const razem = (fun1, fun2, cb) => {
  let resultCount = 0;
  let results = [];

  const handleResult = (index, value) => {
    results[index] = value;
    resultCount++;

    if (resultCount === 2) {
      cb(results);
    }
  };

  fun1((result1) => {
    handleResult(0, result1);
  });

  fun2((result2) => {
    handleResult(1, result2);
  });
};

const asyncFunction1 = (cb) => {
  setTimeout(() => {
    cb("Wynik z funkcji 1");
  }, 1000);
};

const asyncFunction2 = (cb) => {
  setTimeout(() => {
    cb("Wynik z funkcji 2");
  }, 500);
};

const callback = (results) => {
  console.log(results);
};

razem(asyncFunction1, asyncFunction2, callback);
