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
    tipo,
    titulo,
    estado,
  } = req.body;

  db.query(
    "CALL Profesor_Crear(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      documento,
      tipoDocumento,
      nombre,
      apellido,
      usuario,
      contrasena,
      correo,
      tipo,
      titulo,
      estado,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar profesor");
      } else {
        res.send("Profesor registrado con éxito");
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
    tipo,
    titulo,
  } = req.body;

  db.query(
    "CALL Profesor_Editar(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      documento,
      tipoDocumento,
      nombre,
      apellido,
      usuario,
      contrasena,
      correo,
      tipo,
      titulo,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar profesor");
      } else {
        res.send("Profesor actualizado con éxito");
      }
    }
  );
});

//ELIMINAR
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL Profesor_Deshabilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al deshabilitar profesor");
    } else {
      res.send("Profesor deshabilitado con éxito");
    }
  });
});

//LISTAR POR ID
router.get("/by-id", (req, res) => {
  db.query("CALL Profesor_ObtenerOrdenadosPorID()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los profesores por ID");
    } else {
      res.send(result[0]);
    }
  });
});

//LISTAR
router.get("/", (req, res) => {
  db.query("CALL Profesor_ObtenerOrdenados()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los profesores");
    } else {
      res.send(result[0]);
    }
  });
});

module.exports = router;
