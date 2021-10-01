const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");

// Rutas del Públicas:
// ...
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/:id", pagesController.showOne);

publicRouter.post("/comentario/:id", pagesController.storeComment);

publicRouter.get("/api/articulos", pagesController.apiCreation);

module.exports = publicRouter;
