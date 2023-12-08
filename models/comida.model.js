const sql = require("./db.js");

// Constructor
const Comida = function (comida) {
  this.id = comida.id;
  this.titulo = comida.titulo;
  this.descripcion = comida.descripcion;
  this.imagen = comida.imagen;
};

// Crear una nueva Comida
Comida.create = (nuevaComida, resultado) => {
  sql.query("INSERT INTO comidas SET ?", nuevaComida, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }

    console.log("Comida creada: ", { id: res.insertId, ...nuevaComida });
    resultado(null, { id: res.insertId, ...nuevaComida });
  });
};

// Obtener todas las Comidas
Comida.getAll = (resultado) => {
  sql.query("SELECT * FROM comidas", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    console.log("Comidas: ", res);
    resultado(null, res);
  });
};

// Encontrar una sola Comida por ID
Comida.findById = (id, resultado) => {
  sql.query(`SELECT * FROM comidas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }

    if (res.length) {
      console.log("Comida encontrada: ", res[0]);
      resultado(null, res[0]);
      return;
    }

    // No se encontraron Comidas con el ID proporcionado
    resultado({ kind: "not_found" }, null);
  });
};

// Actualizar una Comida por ID
Comida.updateById = (id, comida, resultado) => {
  sql.query(
    "UPDATE comidas SET titulo = ?, descripcion = ?, imagen = ? WHERE id = ?", [comida.titulo, comida.descripcion, comida.imagen, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        resultado(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró una Comida con el ID proporcionado
        resultado({ kind: "not_found" }, null);
        return;
      }

      console.log("Comida actualizada: ", { id: id, ...comida });
      resultado(null, { id: id, ...comida });
    }
  );
};

// Eliminar una Comida por ID
Comida.remove = (id, resultado) => {
  sql.query("DELETE FROM comidas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // No se encontró una Comida con el ID proporcionado
      resultado({ kind: "not_found" }, null);
      return;
    }

    console.log("Comida eliminada con ID: ", id);
    resultado(null, res);
  });
};

// Eliminar todas las Comidas
Comida.removeAll = (resultado) => {
  sql.query("DELETE FROM comidas", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(null, err);
      return;
    }

    console.log(`Eliminadas ${res.affectedRows} comidas`);
    resultado(null, res);
  });
};

module.exports = Comida;
