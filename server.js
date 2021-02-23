require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./network/routes");
const db = require("./db");

const PORT = 3000;
const app = express();

// Conectar base de datos
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// El router que gestiona todas las peticiones HTTP de los distintos componentes
router(app);

// servir archivos de la carpeta public
app.use("/app", express.static("public"));

app.listen(PORT, () => {
  console.log("[SERVER]: Listening on http://localhost:" + PORT);
});
