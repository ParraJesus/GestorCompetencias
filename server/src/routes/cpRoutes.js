const express = require("express");
const router = express.Router();
const db = require("../db");

//LISTAR COMPETENCIAS POR PROGRAMA
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("CALL CP_ObtenerConDetallesPorPrograma(?)", [id], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error al obtener las competencias del programa ${id}`);
    } else if (result[0].length === 0) {
      res.status(404).send("Lista de competencias vacías o no encontradas");
    } else {
      res.send(result[0][0]);
    }
  });
});

module.exports = router;
