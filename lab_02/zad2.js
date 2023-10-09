const wishlist = [
    {
      name: 'Czajnik',
      netto: 100
    },
    {
      name: 'Lodówka',
      netto: 1300
    },
    {
      name: 'Mikrofalówka',
      netto: 340
    },
    {
      name: 'Mikser',
      netto: 120
    },
    {
      name: 'Piekarnik',
      netto: 2100
    }
]

const func = (tab, trans) => {
    return tab.reduce((akum, elem) => {
        akum.push(trans(elem))
        return akum
    }, [])
}

console.log(func(wishlist,  x  => x.name + ' -> ' + x.netto))