const express = require("express");
const router = express.Router();
const db = require("../db");

//CREAR
router.post("/", (req, res) => {
  const {
    documento,
    tipoDocumento,
    nombre,
    apellido,
    usuario,
    contrasena,
    correo,
    estado,
  } = req.body;

  db.query(
    "CALL Evaluador_Crear(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      documento,
      tipoDocumento,
      nombre,
      apellido,
      usuario,
      contrasena,
      correo,
      estado,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar al evaluador");
      } else {
        res.send("Evaluador registrado con éxito");
      }
    }
  );
});

//ACTUALIZAR
router.put("/", (req, res) => {
  const {
    id,
    documento,
    tipoDocumento,
    nombre,
    apellido,
    usuario,
    contrasena,
    correo,
  } = req.body;

  db.query(
    "CALL Evaluador_Editar(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      documento,
      tipoDocumento,
      nombre,
      apellido,
      usuario,
      contrasena,
      correo,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar al evaluador");
      } else {
        res.send("Evaluador actualizado con éxito");
      }
    }
  );
});

//ELIMINAR
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL Evaluador_Deshabilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al deshabilitar evaluador");
    } else {
      res.send("Evaluador deshabilitado con éxito");
    }
  });
});

//HABILITAR
router.put("/habilitar/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL Evaluador_Habilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al habilitar");
    } else {
      res.send("Habilitado con éxito");
    }
  });
});

//LISTAR POR ID
/*router.get("/by-id", (req, res) => {
    db.query("CALL Profesor_ObtenerOrdenadosPorID()", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener los profesores por ID");
        } else {
            res.send(result[0]); 
        }
    });
});*/

//OBTENER ÚNICO POR ID
router.get("/evaluador/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL Evaluador_ObtenerUnicoPorID(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los profesores");
    } else {
      res.send(result[0]);
    }
  });
});

//LISTAR
router.get("/", (req, res) => {
  db.query("CALL Evaluador_ObtenerOrdenados()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los evaluadores");
    } else {
      res.send(result[0]);
    }
  });
});

module.exports = router;
