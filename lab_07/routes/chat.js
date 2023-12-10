const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.get("/", async (req, res) => {
  try {
    const msgs = await Chat.find();
    res.status(200).json(msgs);
  } catch (e) {
    res.status(503).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { msg, user } = req.body;
    const doc = {
      text: msg,
      user: user,
    };
    const ifCreated = await Chat.create(doc);
    ifCreated ? res.sendStatus(201) : res.sendStatus(500);
  } catch (e) {
    res.status(503).json(e);
  }
});

module.exports = router;
