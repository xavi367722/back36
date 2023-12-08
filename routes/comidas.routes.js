const express = require("express");
const router = express.Router();
const comidaController = require("../controllers/comida.controller.js");

// Crear una nueva comida
router.post("/", comidaController.create);

// Obtener todas las comidas
router.get("/", comidaController.findAll);

// Obtener una sola comida por ID
router.get("/:id", comidaController.findOne);

// Actualizar una comida por ID
router.put("/:id", comidaController.update);

// Eliminar una comida por ID
router.delete("/:id", comidaController.delete);

// Eliminar todas las comidas
router.delete("/", comidaController.deleteAll);

module.exports = router;
