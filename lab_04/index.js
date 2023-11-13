const startForm = document.getElementById("game-form");
const form = document.getElementById("number-form");
const results = document.querySelector(".res");
const points = document.querySelector(".points");

let game;

startForm.onsubmit = (e) => {
  e.preventDefault();
  const size = document.getElementsByName("size")[0].value;
  const dim = document.getElementsByName("dim")[0].value;
  const max = document.getElementsByName("max")[0].value;
  axios.post("http://localhost:3000/mmind", { size, dim, max }).then((res) => {
    game = res.data.id;
    console.log("Game created!");
  });
};

form.onsubmit = (e) => {
  e.preventDefault();
  const dataToSend = [game];

  const inputs = form.querySelectorAll("input");
  const resDiv = document.createElement("div");
  results.appendChild(resDiv);

  inputs.forEach((el) => {
    const span = document.createElement("span");
    span.innerText = el.value;
    span.setAttribute("class", "res-span");
    resDiv.appendChild(span);
    dataToSend.push(el.value);
  });

  axios.patch("http://localhost:3000/mmind", dataToSend).then((res) => {
    if (Object.hasOwn(res.data, "black")) {
      const pointsDiv = document.createElement("div");
      points.appendChild(pointsDiv);
      const blackPts = document.createElement("span");
      blackPts.innerText = res.data.black;
      const whitePts = document.createElement("span");
      whitePts.innerText = res.data.white;
      blackPts.setAttribute("class", "black-pts");
      whitePts.setAttribute("class", "white-pts");
      pointsDiv.appendChild(blackPts);
      pointsDiv.appendChild(whitePts);
    } else {
      console.log("Bad data");
    }
  });
};
