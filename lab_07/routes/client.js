const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", checkAuthenticated, (req, res) => {
  res.render("mainPage", { name: req.user.login });
});

router.get("/chat", checkAuthenticated, (req, res) => {
  const msgs = [];
  axios
    .get("http://localhost:3000/chat")
    .then((result) => {
      result.data.forEach((element) => {
        msgs.push(element);
      });
      res.render("chat", {
        msgs,
        user: req.user.login,
      });
    })
    .catch((e) => {
      res.render("error", {
        error: e.message,
      });
    });
});

router.get("/login", checkLoggedIn, (req, res) => {
  res.render("login");
});

router.get("/register", checkLoggedIn, (req, res) => {
  res.render("register");
});

router.get("/users", checkAdmin, (req, res) => {
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

router.get("/addUser", checkAdmin, (req, res) => {
  res.render("addUser");
});

router.get("/users/:id", checkAuthenticated, (req, res) => {
  const user = req.params.id;
  if (req.user.admin || req.user.id == user) {
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
  } else {
    res.redirect("/client");
  }
});

router.get("/editUser/:id", checkAuthenticated, (req, res) => {
  const user = req.params.id;
  if (req.user.admin || req.user.id == user) {
    axios
      .get(`http://localhost:3000/users/${user}`)
      .then((result) => {
        if (result.data.admin == false || req.user.id == user) {
          res.render("editUser", {
            method: req.query.method || "put",
            userId: req.params.id,
          });
        } else {
          res.render("error", {
            error: "you cant edit an admin",
          });
        }
      })
      .catch((_e) => {
        res.render("error", {
          error: "no such user to edit",
        });
      });
  } else {
    res.redirect("/client");
  }
});

router.get("/deleteUser/:id", checkAuthenticated, (req, res) => {
  const user = req.params.id;
  if (req.user.admin || req.user.id == user) {
    axios
      .get(`http://localhost:3000/users/${user}`)
      .then((result) => {
        if (result.data.admin == false || req.user.id == user) {
          res.render("deleteUser", {
            user: result.data,
            userId: req.params.id,
          });
        } else {
          res.render("error", {
            error: "you cant delete an admin",
          });
        }
      })
      .catch((_e) => {
        res.render("error", {
          error: "no such user to delete",
        });
      });
  } else {
    res.redirect("/client");
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/client/login");
}

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/client");
  }
  next();
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  res.redirect("/client");
}

module.exports = router;
