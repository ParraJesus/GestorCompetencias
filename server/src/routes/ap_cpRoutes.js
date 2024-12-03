const express = require("express");
const router = express.Router();
const db = require("../db");

//LISTAR COMPETENCIAS POR ASIGNATURA PLANTILLA
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "CALL AP_CP_ObtenerCompetenciasConDetallesPorAsignatura(?)",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            `Error al obtener las competencias relacionadas a la asignatura_plantilla ${id}`
          );
      } else if (result[0].length === 0) {
        res.status(404).send("Lista de competencias vacías o no encontradas");
      } else {
        res.send(result[0][0]);
      }
    }
  );
});

//CREAR
router.post("/:id_ap/:id_cp", (req, res) => {
  const { id_ap, id_cp } = req.params;

  db.query("CALL AP_CP_Crear(?, ?)", [id_ap, id_cp], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al registrar");
    } else {
      res.send("Registrado con éxito");
    }
  });
});

//CREAR
router.delete("/:id_ap/:id_cp", (req, res) => {
  const { id_ap, id_cp } = req.params;
  console.log(id_ap, id_cp);
  db.query("CALL AP_CP_Eliminar(?, ?)", [id_ap, id_cp], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al eliminar");
    } else {
      res.send("Eliminado con éxito");
    }
  });
});

module.exports = router;
