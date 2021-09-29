const express = require("express");
const publicRouter = express.Router();
const userController = require("../controllers/userController");

// Rutas del Públicas:
// ...
publicRouter.get("/", userController.index);

publicRouter.get("/:id", userController.show);

module.exports = publicRouter;
