require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./network/routes");
const db = require("./db");
const { connect } = require("./socket");

const PORT = 8080;
const app = express();
const server = require("http").Server(app);

// Conectar base de datos
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Le mando mi server al socket
connect(server);

// El router que gestiona todas las peticiones HTTP de los distintos componentes
router(app);

// servir archivos de la carpeta public
app.use("/app", express.static("public"));

server.listen(PORT, () => {
  console.log("[SERVER]: Listening on http://localhost:" + PORT);
});
