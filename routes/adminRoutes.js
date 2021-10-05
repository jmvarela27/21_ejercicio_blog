const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

// Rutas del Admin:
// ...
adminRouter.get("/articulos", adminController.index);

adminRouter.get("/articulos/crear", adminController.create);

adminRouter.get("/articulos/editar/:id", adminController.edit);

adminRouter.get("/articulos/eliminar/:id", adminController.destroy);

adminRouter.post("/articulos", adminController.store);

adminRouter.post("/articulos/editar/:id", adminController.update);

// adminRouter.get("/api/articulos", adminController.apiCreation);

module.exports = adminRouter;
