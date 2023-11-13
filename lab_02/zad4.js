let szablon =
  '<table border="{border}">' +
  "  <tr><td>{first}</td><td>{last}</td></tr>" +
  "</table>";

String.prototype.podstaw = (params) => {
  for (const key in params) {
    if (szablon.includes(key)) {
      szablon = szablon.replace(key, params[key]);
    }
  }
};

let dane = {
  first: "Jan",
  last: "Kowalski",
  pesel: "97042176329",
};

szablon.podstaw(dane);

console.log(szablon);
