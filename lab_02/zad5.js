const groupMap = (tab, key, fun) => {
  const keys = [];
  tab.forEach((el) => {
    keys.push(key(el));
  });
  const setKeys = new Set(keys);

  const res = {};
  setKeys.forEach((el) => {
    res[el] = [];
  });
  tab.forEach((elem) => {
    const keyValue = key(fun(elem));
    res[keyValue].push(fun(elem));
  });
  return res;
};

console.log(
  groupMap(
    [3, 2, 4, 4, 3],
    (n) => n % 2 === 0,
    (n) => n + 1
  )
);
