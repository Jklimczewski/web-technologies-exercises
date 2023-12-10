const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/users", (req, res) => {
  const users = [];
  axios
    .get("http://localhost:3000/users")
    .then((result) => {
      result.data.forEach((element) => {
        users.push(element);
      });
      res.render("users", {
        users: users,
      });
    })
    .catch((e) => {
      res.render("error", {
        error: e.message,
      });
    });
});

router.get("/addUser", (req, res) => {
  res.render("addUser");
});

router.get("/users/:id", (req, res) => {
  const user = req.params.id;
  axios
    .get(`http://localhost:3000/users/${user}`)
    .then((result) => {
      res.render("user", {
        user: result.data,
      });
    })
    .catch((_e) => {
      res.render("error", {
        error: "no such user",
      });
    });
});

router.get("/editUser/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/users/${req.params.id}`)
    .then((_result) => {
      res.render("editUser", {
        method: req.query.method || "put",
        userId: req.params.id,
      });
    })
    .catch((_e) => {
      res.render("error", {
        error: "no such user to edit",
      });
    });
});

router.get("/deleteUser/:id", (req, res) => {
  axios
    .get(`http://localhost:3000/users/${req.params.id}`)
    .then((result) => {
      res.render("deleteUser", {
        user: result.data,
        userId: req.params.id,
      });
    })
    .catch((_e) => {
      res.render("error", {
        error: "no such user to delete",
      });
    });
});

module.exports = router;
