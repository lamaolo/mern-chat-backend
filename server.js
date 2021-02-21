const express = require("express");
const bodyParser = require("body-parser");
const response = require("./network/response");

const router = express.Router();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.get("/", (req, res) => {
  /*res.header({
    "custom-header": "Mi header personalizado",
  });
  console.log(req.headers)*/
  response.success(req, res, "Lista de mensajes", 200);
});

router.post("/", (req, res) => {
  // console.log(req.body);
  if (req.query.error) {
    response.error(
      req,
      res,
      "ERROR!!",
      500,
      "Es solo una simulación de los errores"
    );
  } else {
    response.success(req, res, "Creado correctamente", 201);
  }
});

// servir archivos de la carpeta public
app.use("/app", express.static("public"));

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
