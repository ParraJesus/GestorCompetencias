const express = require("express");
const router = express.Router();
const db = require("../db");

//LISTAR TODOS LOS PERIODOS
router.get("/", (req, res) => {
  db.query("CALL Periodo_Obtener()", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener los profesores");
    } else {
      res.send(result[0]);
    }
  });
});

//LISTAR UN PERIODO
router.get("/:periodo_id", (req, res) => {
  const { periodo_id } = req.params;
  db.query("CALL Periodo_ObtenerUnico(?)", [periodo_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener el periodo");
    } else if (result[0].length === 0) {
      res.status(404).send("Periodo vacío o no encontrado");
    } else {
      res.send(result[0]);
    }
  });
});

module.exports = router;
