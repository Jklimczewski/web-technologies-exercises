const old = [
    { 
      id: 'abc',
      name: 'Ala'
    },
    {
      id: 'def',
      name: 'Tomek'
    },
    {
      id: 'ghi',
      name: 'Jan'
    }
]

const newOne = old.reduce((akum, elem) => {
    akum[elem.id] = elem;
    return akum;
  }, {});

console.log(newOne)