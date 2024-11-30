const express = require("express");
const router = express.Router();
const db = require("../db");

//CREAR
router.post("/create", (req, res) => {
    const { as_id, estudiante_id, pmat_id } = req.body;

    db.query(
        "CALL Matricula_Crear(?, ?, ?)",
        [as_id, estudiante_id, pmat_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al registrar la matrícula");
            } else {
                res.status(200).send("Matrícula registrada con éxito");
            }
        }
    );
});

//ACTUALIZAR
router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { as_id, estudiante_id, pmat_id } = req.body;

    db.query(
        "CALL Matricula_Editar(?, ?, ?, ?)",
        [id, as_id, estudiante_id, pmat_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al actualizar la matrícula");
            } else {
                res.status(200).send("Matrícula actualizada con éxito");
            }
        }
    );
});

//ELIMINAR
router.delete("/delete/:id", (req, res) => {
    const { id } = req.params; 

    db.query(
        "DELETE FROM MATRICULA WHERE MATRICULA_ID = ?",
        [id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al eliminar la matrícula");
            } else if (result.affectedRows === 0) {
                res.status(404).send("Matrícula no encontrada");
            } else {
                res.status(200).send("Matrícula eliminada con éxito");
            }
        }
    );
});

//LISTAR
router.get("/", (req, res) => {
    db.query(
        "SELECT * FROM MATRICULA",
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener las matrículas");
            } else {
                res.status(200).json(results);
            }
        }
    );
});


//LISTAR POR ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM MATRICULA WHERE MATRICULA_ID = ?",
        [id],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener la matrícula");
            } else if (results.length === 0) {
                res.status(404).send("Matrícula no encontrada");
            } else {
                res.status(200).json(results[0]);
            }
        }
    );
});

module.exports = router;

