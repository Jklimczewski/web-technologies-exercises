const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000
app.use(express.json());

const games = {}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/mmind', (req, res) => {
    const size = req.body.size;
    const dim = req.body.dim;
    const max = req.body.max;
    const id = uuidv4();
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const hidden = []
    for (let index = 0; index < size; index++) {
        hidden.push(getRandomInt(max))
    }
    games[id] = hidden
    res.json({id, size, dim, max});
});

app.patch('/mmind', (req, res) => {
    const [gameid, ...guesses] = req.body;
    const hidden_code = games[gameid]
    let black = 0;
    let white = 0;
    let first = true;
    hidden_code.forEach(letter => {
        first = true
        guesses.forEach(element => {
            if ((letter == element) && first) {
                black++
            }
            else if (letter == element) {
                white++;
            }
            first = false
        });
        guesses.slice(1);
    });
    res.json({gameid, black, white})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})