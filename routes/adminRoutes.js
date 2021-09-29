const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

// Rutas del Admin:
// ...

adminRouter.get("/articulos", adminController.index);

adminRouter.get("/admin/articulos/crear", adminController.create);

adminRouter.get("/admin/articulos/editar/:id", adminController.edit);

adminRouter.get("/admin/articulos/eliminar/:id", adminController.destroy);

adminRouter.post("/admin/articulos", adminController.store);

adminRouter.post("/admin/articulos/editar/:id", adminController.update);

adminRouter.get("/api/articulos", adminController.apiCreation);

module.exports = adminRouter;
