const groupMap = (tab, key, fun) => {
  const keys = [];
  tab.forEach((el) => {
    keys.push(key(el));
  });
  const setKeys = new Set(keys);
  console.log(setKeys);
  //   tab.reduce((akum, elem) => {
  //     const temp = key(elem);
  //     console.log(temp);
  //     akum[temp] = elem;
  //     return akum;
  //   }, {});
};

console.log(
  groupMap(
    [3, 2, 4, 4, 3],
    (n) => n % 2 === 0,
    (n) => n + 1
  )
);
