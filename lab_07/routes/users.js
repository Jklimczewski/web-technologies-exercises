const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

// Rejerstracja nowego użytkownika
router.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doc = {
      login,
      email,
      password: hashedPassword,
      registrationDate: Date.now(),
    };
    if (login == "admin") doc.admin = true;
    const ifExist = await User.findOne({ email: email });
    if (ifExist) {
      res.sendStatus(409);
    } else {
      const ifCreated = await User.create(doc);
      ifCreated
        ? res.status(201).json({ redirect: "/client/login" })
        : res.sendStatus(500);
    }
  } catch (e) {
    res.status(503).json(e);
  }
});

// Login użytkownika
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/client",
    failureRedirect: "/client/login",
  })
);

// Logout użytkownika
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/client/login");
  });
});

// Pobranie danych wszystkich użytkowników
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(503).json(e);
  }
});

// Utworzenie nowego użytkownika przez administratora
router.post("/", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doc = {
      login,
      email,
      password: hashedPassword,
      registrationDate: Date.now(),
    };
    if (login == "admin") doc.admin = true;
    const ifCreated = await User.create(doc);
    ifCreated ? res.sendStatus(201) : res.sendStatus(500);
  } catch (e) {
    res.status(503).json(e);
  }
});

// Pobranie danych użytkownika o podanym userId
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) res.status(200).json(user);
  } catch (e) {
    res.status(503).json(e);
  }
});

// Zastąpienie danych użytkownika o podanym userId nowym „kompletem”
router.put("/:userId", async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.userId);
    if (oldUser) {
      const { login, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updated = {
        login,
        email,
        password: hashedPassword,
        registrationDate: oldUser.registrationDate,
        admin: oldUser.admin,
      };
      const ifEdited = await User.replaceOne(
        { _id: req.params.userId },
        updated
      );
      ifEdited ? res.status(200).send("Edited") : res.sendStatus(500);
    }
  } catch (e) {
    res.status(503).json(e);
  }
});

// Usuniecie użytkownika o podanym userId
router.delete("/:userId", async (req, res) => {
  try {
    const ifDeleted = await User.deleteOne({
      _id: req.params.userId,
    });
    ifDeleted.deletedCount === 1
      ? res.status(200).send("Deleted")
      : res.sendStatus(204);
  } catch (e) {
    res.status(503).json(e);
  }
});

// „Unacześnienie” wybranych danych użytkownika o podanym userId
router.patch("/:userId", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const updated = {};
    if (login) {
      updated.login = login;
    }
    if (email) {
      updated.email = email;
    }
    if (password) {
      updated.password = await bcrypt.hash(password, 10);
    }

    const ifEdited = await User.updateOne({ _id: req.params.userId }, updated);
    ifEdited ? res.status(200).send("Edited") : res.sendStatus(500);
  } catch (e) {
    res.status(503).json(e);
  }
});

module.exports = router;
