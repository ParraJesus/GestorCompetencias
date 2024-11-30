const express = require('express');
const router = express.Router();
const pool = require('../db')

router.post('/create', async (req, res) => {
    const { ap_id, nombre, descripcion, grupo, semestre, modalidad, tipo_materia, creditos } = req.body;
    try {
        await pool.query('CALL AS_Crear(?, ?, ?, ?, ?, ?, ?, ?)', [ap_id, nombre, descripcion, grupo, semestre, modalidad, tipo_materia, creditos]);
        res.status(201).json({ message: 'Asignatura creada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignatura.' });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, grupo, modalidad, tipo_materia } = req.body;
    try {
        await pool.query('CALL AS_Editar(?, ?, ?, ?, ?, ?)', [id, nombre, descripcion, grupo, modalidad, tipo_materia]);
        res.status(200).json({ message: 'Asignatura editada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar la asignatura.' });
    }
});

router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('CALL AS_Eliminar(?)', [id]);
        res.status(200).json({ message: 'Asignatura eliminada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignatura.' });
    }
});

module.exports = router;

