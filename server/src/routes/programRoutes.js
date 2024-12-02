const express = require("express");
const router = express.Router();
const db = require("../db");

//LISTAR
router.get("/", (req, res) => {
  db.query("CALL Programa_ObtenerOrdenados()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los programas");
    } else {
      res.send(result[0]);
    }
  });
});

//ASIGNATURAS COMPETENCIAS DE UN PROGRAMA EN ESPECÍFICO
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL AP_ObtenerPorPrograma(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener el programa");
    } else if (result[0].length === 0) {
      res.status(404).send("Programa vacío o no encontrado");
    } else {
      res.send(result[0]);
    }
  });
});

//OBTENER DATOS DE UN PROGRAMA EN ESPECÍFICO
router.get("/programa/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL Programa_ObtenerUnicoPorID(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener el programa");
    } else if (result[0].length === 0) {
      res.status(404).send("Programa vacío o no encontrado");
    } else {
      res.send(result[0]);
    }
  });
});

//CREAR
router.post("/create", (req, res) => {
  const {
    coordinador_id,
    nombre,
    duracion_semestres,
    titulo,
    modalidad,
    facultad,
    tipo_programa,
    estado,
  } = req.body;

  db.query(
    "CALL Programa_Crear(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      coordinador_id,
      nombre,
      duracion_semestres,
      titulo,
      modalidad,
      facultad,
      tipo_programa,
      estado,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al crear el programa");
      } else {
        res.status(200).send("Programa creado con éxito");
      }
    }
  );
});

//ACTUALIZAR
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    coordinador_id,
    nombre,
    duracion_semestres,
    titulo,
    modalidad,
    facultad,
    tipo_programa,
  } = req.body;

  db.query(
    "CALL Programa_Editar(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      coordinador_id,
      nombre,
      duracion_semestres,
      titulo,
      modalidad,
      facultad,
      tipo_programa,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el programa");
      } else {
        res.status(200).send("Programa actualizado con éxito");
      }
    }
  );
});

//ELIMINAR
router.put("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query("CALL Programa_Deshabilitar(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al deshabilitar el programa");
    } else {
      res.status(200).send("Programa deshabilitado con éxito");
    }
  });
});

module.exports = router;
