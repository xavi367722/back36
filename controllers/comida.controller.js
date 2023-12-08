const Comida = require("../models/comida.model.js");


// Crear y guardar una nueva comida
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacío",
        });
    }

    // Crear una comida
    const nuevaComida = new Comida({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
    });

    // Guardar la comida en la base de datos
    Comida.create(nuevaComida, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrió algún error al crear la comida.",
            });
        else res.send(data);
    });
};

// Obtener todas las comidas desde la base de datos
exports.findAll = (req, res) => {
    Comida.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocurrió algún error al recuperar las comidas.",
            });
        else res.send(data);
    });
};

// Encontrar una sola comida por ID
exports.findOne = (req, res) => {
    Comida.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró comida con ID ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error al recuperar comida con ID " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Actualizar una comida identificada por el ID en la solicitud
exports.update = (req, res) => {
    // Validar la solicitud
    if (!req.body) {
        console.log(req.body);
        res.status(400).send({
            message: "El contenido no puede estar vacío",
        });
    }

    Comida.updateById(req.params.id, new Comida(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró comida con ID ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error al actualizar comida con ID " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Eliminar una comida con el ID especificado en la solicitud
exports.delete = (req, res) => {
    Comida.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró comida con ID ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar comida con ID " + req.params.id,
                });
            }
        } else res.send({ message: `Comida eliminada exitosamente.` });
    });
};

// Eliminar todas las comidas desde la base de datos
exports.deleteAll = (req, res) => {
    Comida.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ocurrió algún error al eliminar todas las comidas.",
            });
        else res.send({ message: `Todas las comidas fueron eliminadas exitosamente.` });
    });
};
