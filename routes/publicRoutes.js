const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController");

// Rutas del Públicas:
// ...
publicRouter.get("/", publicController.index);

publicRouter.get("/:id", publicController.show);

module.exports = publicRouter;
