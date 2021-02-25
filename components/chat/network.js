const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

// POST A new chat
router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

// GET All users
router.get("/:userId", (req, res) => {
  controller
    .listChats(req.params.userId)
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

module.exports = router;
