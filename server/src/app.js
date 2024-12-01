const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");

const profesorRoutes = require("./routes/profesorRoutes.js");
const estudianteRoutes = require("./routes/estudianteRoutes.js");
const evaluadorRoutes = require("./routes/evaluadorRoutes.js");

const programaRoutes = require("./routes/programRoutes.js");

const matriculaRoutes = require("./routes/matriculaRoutes.js");
const asignaturaRoutes = require("./routes/asig_semestreRoutes.js");
const asig_plantillaRoutes = require("./routes/asig_plantillaRoutes.js");

const loginRoutes = require("./routes/LoginRoutes.js");

const app = express();

// settings
app.set("appName", "CREA server");
app.set("port", 5000);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(cookieParser());

// rutas
app.use(userRoutes);
app.use("/login", loginRoutes);

app.use("/profesores", profesorRoutes);
app.use("/estudiantes", estudianteRoutes);
app.use("/evaluadores", evaluadorRoutes);
app.use("/programas", programaRoutes);
app.use("/asignaturas", asignaturaRoutes);
app.use("/asig_plantilla", asig_plantillaRoutes);

app.use("/matriculas", matriculaRoutes);

module.exports = app;
