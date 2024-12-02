const express = require("express");
const router = express.Router();
const db = require("../db");

//OBTENER DATOS DE UNA ASIGNATURA PLANTILLA
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL AP_ObtenerPorID(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error al obtener la asignatura_plantilla ${id}`);
    } else if (result[0].length === 0) {
      res.status(404).send("Asignatura plantilla vacía o no encontrada");
    } else {
      res.send(result[0][0]);
    }
  });
});

//CREAR
router.post("/create", (req, res) => {
  const {
    programa_id,
    nombre,
    descripcion,
    creditos,
    semestre,
    horas_semana,
    modalidad,
    tipo_materia,
    estado,
  } = req.body;

  db.query(
    "CALL AP_Crear(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      programa_id,
      nombre,
      descripcion,
      creditos,
      semestre,
      horas_semana,
      modalidad,
      tipo_materia,
      estado,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al crear la asignatura en la plantilla.");
      } else {
        res.status(201).send("Asignatura creada en la plantilla con éxito.");
      }
    }
  );
});

//ACTUTALIZAR
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    creditos,
    semestre,
    horas_semana,
    modalidad,
    tipo_materia,
  } = req.body;

  db.query(
    "CALL AP_Editar(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      nombre,
      descripcion,
      creditos,
      semestre,
      horas_semana,
      modalidad,
      tipo_materia,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al editar la asignatura en la plantilla.");
      } else {
        res.status(200).send("Asignatura actualizada con éxito.");
      }
    }
  );
});

//ELIMINAR
router.put("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL AP_Deshabilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Error al deshabilitar la asignatura en la plantilla.");
    } else {
      res.status(200).send("Asignatura deshabilitada con éxito.");
    }
  });
});

module.exports = router;
