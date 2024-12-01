const jwt = require("jsonwebtoken");
const JWT_SECRET = "clave_secreta_super_segura";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No autorizado. Falta el token." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error.message);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
