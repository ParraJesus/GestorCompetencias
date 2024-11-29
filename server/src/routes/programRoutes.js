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

module.exports = router;
