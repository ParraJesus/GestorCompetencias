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
    "CALL Estudiante_Crear(?, ?, ?, ?, ?, ?, ?, ?)",
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
        res.status(500).send("Error al registrar al estudiante");
      } else {
        res.send("Estudiante registrado con éxito");
      }
    }
  );
});

//ELIMINAR
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL Estudiante_Deshabilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al deshabilitar estudiante");
    } else {
      res.send("Estudiante deshabilitado con éxito");
    }
  });
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
    estado,
  } = req.body;

  db.query(
    "CALL Estudiante_Editar(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
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
        res.status(500).send("Error al actualizar al estudiante");
      } else {
        res.send("Estudiante actualizado con éxito");
      }
    }
  );
});

//Habilitar
router.put("/habilitar/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL Estudiante_Habilitar(?)", [id], (err, result) => {
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

//LISTAR
router.get("/", (req, res) => {
  db.query("CALL Estudiante_ObtenerOrdenados()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los estudiantes");
    } else {
      res.send(result[0]);
    }
  });
});

//OBTENER ÚNICO POR ID
router.get("/estudiante/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL Estudiante_ObtenerUnicoPorID(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los profesores");
    } else {
      res.send(result[0]);
    }
  });
});

module.exports = router;
