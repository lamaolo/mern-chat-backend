const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

/**
 * Este router lo uso como middleware en network/routes.js
 * Automáticamente lo seteo a la ruta /message, asi que cualquier ruta
 * Que defina acá, va a tener como prefijo /message/
 */

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

// POST A new message
router.post("/", (req, res) => {
  const {
    body: { user, message },
  } = req;

  controller
    .addMessage(user, message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 400);
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
