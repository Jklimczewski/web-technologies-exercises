const poKoleiTab = async (funTab, cb) => {
  let val = 1;

  for (const fun of funTab) {
    const temp = await fun(val);
    val = temp;
  }
  await cb(val);
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

const fun3 = (y) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(y - 3), 2000);
  });
};

const cb = (y) => {
  console.log(y);
};

const funTab = [fun1, fun2, fun3];

poKoleiTab(funTab, cb);
