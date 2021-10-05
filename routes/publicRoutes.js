const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController")

// Rutas del Públicas:
// ...
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/registro", authController.create);

publicRouter.post("/registro", authController.store);

publicRouter.get("/login", authController.show);

publicRouter.post("/login", authController.login);

publicRouter.get("/:id", pagesController.showOne);

publicRouter.post("/comentario/:id", pagesController.storeComment);

publicRouter.get("/api/articulos", pagesController.apiCreation);

module.exports = publicRouter;
