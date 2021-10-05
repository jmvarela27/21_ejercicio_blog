const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const redirectIfAuthenticated = require("../redirectIfAuthenticated");

// Rutas del Públicas:
// ...
publicRouter.get("/", pagesController.showHome);

publicRouter.get("/registro", redirectIfAuthenticated, authController.create);

publicRouter.post("/registro", redirectIfAuthenticated, authController.store);

publicRouter.get("/login", redirectIfAuthenticated, authController.show);

publicRouter.post("/login", redirectIfAuthenticated, authController.login);

publicRouter.get("/logout", authController.logout);

publicRouter.get("/:id", pagesController.showOne);

publicRouter.post("/comentario/:id", pagesController.storeComment);

publicRouter.get("/api/articulos", pagesController.apiCreation);

module.exports = publicRouter;
