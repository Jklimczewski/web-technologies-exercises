function razemTab(promisesTab, callback) {
  const wynik = [];
  promisesTab.forEach((prom) => {
    prom.then((res) => {
      wynik.push(res);
      if (wynik.length == promisesTab.length) callback(wynik);
    });
  });
}

const prom1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(8), 3000);
});
const prom2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(8), 1000);
});
const prom3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(8), 7000);
});
const prom4 = Promise.resolve(5);

const promTab1 = [prom1, prom2, prom3, prom4];

const cb = (tab) => {
  console.log(tab);
};
razemTab(promTab1, cb);
