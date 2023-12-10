const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.get("/:room", async (req, res) => {
  const room = req.params.room;
  try {
    const msgs = await Chat.find({ nameSpace: room });
    res.status(200).json(msgs);
  } catch (e) {
    res.status(503).json(e);
  }
});

router.post("/:room", async (req, res) => {
  try {
    const { msg, user } = req.body;
    const room = req.params.room;
    const doc = {
      nameSpace: room,
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
