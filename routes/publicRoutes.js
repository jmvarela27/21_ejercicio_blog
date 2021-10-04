const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");

// Rutas del Públicas:
// ...
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/registro", userController.create);

publicRouter.post("/registro", userController.store);

publicRouter.get("/login", userController.showLogin);

publicRouter.post("/login", userController.store);

publicRouter.get("/:id", pagesController.showOne);

publicRouter.post("/comentario/:id", pagesController.storeComment);

publicRouter.get("/api/articulos", pagesController.apiCreation);

module.exports = publicRouter;
