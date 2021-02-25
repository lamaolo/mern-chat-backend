const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

// POST A new user
router.post("/", (req, res) => {
  controller
    .addUser(req.body.name)
    .then((createdUser) => {
      response.success(req, res, createdUser, 201);
    })
    .catch((error) => {
      response.error(req, res, error, 500);
    });
});

// GET All users
router.get("/", (req, res) => {
  controller
    .getUsers()
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((error) => {
      response.error(req, res, error, 400);
    });
});

module.exports = router;
