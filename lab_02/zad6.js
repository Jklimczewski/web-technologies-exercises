const poKolei = (fun1, fun2, cb) => {
  fun1(5)
    .then((res) => fun2(res))
    .then((result) => cb(result));
};

const fun1 = (y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(y + 1), 4000);
  });
};
const fun2 = (y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(y * 2), 3000);
  });
};
const cb = (y) => {
  console.log(y);
};

poKolei(fun1, fun2, cb);
