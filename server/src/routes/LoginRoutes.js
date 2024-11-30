const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios" });
  }

  const query = "CALL Login_Autenticar(?, ?)";

  db.query(query, [usuario, contrasena], (err, results) => {
    if (err) {
      console.error("Error al ejecutar el procedimiento almacenado:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    const data = results[0][0];
    if (!data || !data.tipo_usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.json({
      tipo_usuario: data.tipo_usuario,
    });
  });
});

module.exports = router;
