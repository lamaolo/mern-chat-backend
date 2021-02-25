const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: { type: String, required: true },
});

const Model = mongoose.model("User", mySchema);

module.exports = Model;
