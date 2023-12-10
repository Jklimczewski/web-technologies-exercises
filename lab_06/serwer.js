const express = require("express");
const app = express();
const path = require("path");
const sass = require("node-sass-middleware");
const cookie = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
const secret = process.env.APP_SECRET || "$sekretny $sekret";

app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  sass({
    src: path.join(__dirname, "/scss"),
    dest: path.join(__dirname, "/public"),
    outputStyle: "compressed",
  })
);
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const initializePassport = require("./passport-config");
initializePassport(passport);

app.use(express.static(path.join(__dirname, "public")));

// Dodajemy usługi REST, które należy zdefiniować w pliku „users.js”
// znajdującym się w podkatalogu „routes”
const users = require("./routes/users");
const client = require("./routes/client");
app.use("/users", users);
app.use("/client", client);

app.set("view engine", "ejs");

const dbConnData = {
  host: process.env.MONGO_HOST || "127.0.0.1",
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || "lab05",
};

// Łączymy się z bazą MongoDB i jeśli się to uda, uruchamiamy serwer API.
mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const apiPort = process.env.PORT || 3000;
    const apiHost = process.env.API_HOST || "localhost";
    app.listen(apiPort, () => {
      console.log(`API server available from: http://${apiHost}:${apiPort}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
