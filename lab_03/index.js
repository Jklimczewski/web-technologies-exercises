const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(express.json());

const games = {};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/mmind", (req, res) => {
  const size = req.body.size;
  const dim = req.body.dim;
  const max = req.body.max;
  const id = uuidv4();
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const hidden = [];
  for (let index = 0; index < size; index++) {
    hidden.push(getRandomInt(max));
  }
  games[id] = { code: hidden, max: max, left: max };
  res.json({ id, size, dim, max });
});

app.patch("/mmind", (req, res) => {
  let [gameid, ...guesses] = req.body;
  if (games[gameid]["left"] > 0) {
    const hidden_code = games[gameid]["code"];
    const [black, white] = ocenRuch(guesses, hidden_code);
    games[gameid]["zostalo"] -= 1;
    if (black == hidden_code.length) {
      res.send("Gra skończona!");
    } else {
      res.json({ gameid, black, white });
    }
  } else {
    res.send("Gra skończona");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function ocenRuch(guesses, hidden_code) {
  let czarnePunkty = 0;
  let bialePunkty = 0;
  const ocenioneC = new Array(hidden_code.length).fill(false);
  const ocenioneR = new Array(guesses.length).fill(false);

  for (let k = 0; k < guesses.length; k++) {
    if (guesses[k] === hidden_code[k]) {
      czarnePunkty++;
      ocenioneC[k] = true;
      ocenioneR[k] = true;
    }
  }

  for (let k = 0; k < guesses.length; k++) {
    if (!ocenioneR[k]) {
      for (let m = 0; m < hidden_code.length; m++) {
        if (!ocenioneC[m] && guesses[k] === hidden_code[m]) {
          bialePunkty++;
          ocenioneC[m] = true;
          ocenioneR[k] = true;
          break;
        }
      }
    }
  }

  return [czarnePunkty, bialePunkty];
}
