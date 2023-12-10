const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Pobranie danych wszystkich użytkowników
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(503).json(e);
  }
});

// Utworzenie nowego użytkownika
router.post("/", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const doc = {
      login,
      email,
      password,
      registrationDate: Date.now(),
    };
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
    res.status(200).json(user);
  } catch (e) {
    res.status(503).json(e);
  }
});

// Zastąpienie danych użytkownika o podanym userId nowym „kompletem”
router.put("/:userId", async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.userId);
    const { login, email, password } = req.body;
    const updated = {
      login,
      email,
      password,
      registrationDate: oldUser.registrationDate,
    };
    const ifEdited = await User.replaceOne({ _id: req.params.userId }, updated);
    ifEdited ? res.status(200).send("Edited") : res.sendStatus(500);
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
    if (req.body.login) {
      updated.login = login;
    }
    if (req.body.email) {
      updated.email = email;
    }
    if (req.body.password) {
      updated.password = password;
    }

    const ifEdited = await User.updateOne({ _id: req.params.userId }, updated);
    ifEdited ? res.status(200).send("Edited") : res.sendStatus(500);
  } catch (e) {
    res.status(503).json(e);
  }
});

module.exports = router;
