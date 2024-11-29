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

//ASIGNATURAS DE UN PROGRAMA EN ESPECÍFICO
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

module.exports = router;
