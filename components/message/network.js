const express = require("express");
const multer = require("multer");
const response = require("../../network/response");
const controller = require("./controller");
const path = require("path");

const router = express.Router();

// const upload = multer({
//   // Donde vamos a guardar los archivos que subamos
//   dest: "public/files/",
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/files/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  // Maximo 512 kilobytes, la comprobación la hago en el frontend también
  limits: { fileSize: 512000 },
});

// endpoint => /message

// GET All messages || GET User's messages
router.get("/", (req, res) => {
  const filterMessages = req.query.user || null;

  controller
    .getMessages(filterMessages)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((error) =>
      response.error(req, res, "Ha ocurrido un error", 500, error)
    );
});

// GET Messages from a Chat
router.get("/:chatId", (req, res) => {
  controller
    .getChatMessages(req.params.chatId)
    .then((messages) => {
      response.success(req, res, messages, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

// POST A new message
// 'upload' de multer como un middleware, para subir
// un solo archivo (single) y que tiene el nombre 'file' (viene desde en request).
router.post("/", upload.single("file"), (req, res) => {
  const {
    body: { user, message, chat },
    file,
  } = req;

  controller
    .addMessage(chat, user, message, file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((error) => {
      response.error(
        req,
        res,
        error,
        400,
        error.message ? error.message : error
      );
    });
});

// PATCH An existent message
router.patch("/:id", (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

// DELETE An existent message
router.delete("/:id", (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then((data) => {
      response.success(req, res, `Mensaje ${data.id} ha sido eliminado`, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 404);
    });
});

module.exports = router;
