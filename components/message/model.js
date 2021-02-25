const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: "Chat",
  },
  // El user va a ser un Object ID relacionado con el documento 'User', asi despues lo puedo popular
  // Desde el store, en el metodo getMessages()
  user: { type: Schema.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  file: String,
});

const Model = mongoose.model("Message", mySchema);

module.exports = Model;
