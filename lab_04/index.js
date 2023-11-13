const startForm = document.getElementById("game-form");
const form = document.getElementById("number-form");
const results = document.querySelector(".res");
const points = document.querySelector(".points");

let game = {};

startForm.onsubmit = (e) => {
  e.preventDefault();
  const size = document.getElementById("size").value;
  const dim = document.getElementById("dim").value;
  const max = document.getElementById("max").value;
  axios.post("http://localhost:3000/mmind", { size, dim, max }).then((res) => {
    game.id = res.data.id;
    game.size = res.data.size;
    game.dim = res.data.dim;
    game.max = res.data.max;
    for (let i = 0; i < res.data.size; i++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("class", "number-input");
      input.setAttribute("required", true);
      form.appendChild(input);
    }
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "button");
    button.innerText = "Oceń";
    form.appendChild(button);

    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const info = document.createElement("h2");
    info.innerText = "Tworzenie gry...";
    left.append(info);
    setTimeout(() => {
      left.setAttribute("hidden", true);
      right.setAttribute("class", "right-changed");
    }, 1000);
  });
};

form.onsubmit = (e) => {
  e.preventDefault();
  const dataToSend = [game.id];

  const inputs = form.querySelectorAll("input");
  const resDiv = document.createElement("div");
  results.appendChild(resDiv);

  inputs.forEach((el) => {
    const span = document.createElement("span");
    span.innerText = el.value;
    span.setAttribute("class", "res-span");
    resDiv.appendChild(span);
    dataToSend.push(parseInt(el.value));
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
      window.alert(res.data);
    }
  });
};
