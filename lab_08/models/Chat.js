const { Schema, model } = require("mongoose");

// Pole „_id” (które ma modelować userId) dodawane jest domyślnie, dlatego pomijamy je w deklaracji
const chatSchema = new Schema({
  nameSpace: String,
  user: String,
  text: String,
});

module.exports = model("Chat", chatSchema);
