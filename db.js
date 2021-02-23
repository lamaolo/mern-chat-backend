const mongoose = require("mongoose");

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME } = process.env;

const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

function connectDb() {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("[DB]: DB Conectada"))
    .catch((error) => console.log("[DB]: Error en DB: " + error));
}

module.exports = connectDb;
