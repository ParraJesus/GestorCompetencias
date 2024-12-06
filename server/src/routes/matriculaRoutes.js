const express = require("express");
const router = express.Router();
const db = require("../db");

//CREAR ASIGNATURA SEMESTRE
router.post("/as/", (req, res) => {
  const { ap_id, grupo } = req.body;

  db.query("CALL AS_CrearPorPlantilla(?, ?)", [ap_id, grupo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al registrar");
    } else {
      res.status(200).send("Registrada con éxito");
    }
  });
});

//CREAR PMAT
router.post("/pmat/", (req, res) => {
  const { periodo_id, prof_id, evaluador_id } = req.body;

  db.query(
    "CALL PMAT_Crear(?, ?)",
    [periodo_id, prof_id, evaluador_id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar");
      } else {
        res.status(200).send("Registrada con éxito");
      }
    }
  );
});

//CREAR MATRÍCULA
router.post("/matricula/", (req, res) => {
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

//CREAR REGISTROS DE TODOS
router.post("/registrar", (req, res) => {
  const {
    asignaturaPlantillaId,
    grupo,
    profesorId,
    evaluadorId,
    estudiantes,
    periodoId,
    programaId,
  } = req.body;

  console.log(req.body);
  if (
    !asignaturaPlantillaId ||
    !grupo ||
    !periodoId ||
    !programaId ||
    !profesorId ||
    !evaluadorId ||
    !estudiantes
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  // Paso 1: Llamar al procedimiento AS_CrearPorPlantillaConSalida para crear la asignatura semestre y obtener el ID
  const query = `
      CALL AS_CrearPorPlantillaConSalida(?, ?, @new_as_id);
      SELECT @new_as_id AS new_as_id;
    `;

  db.query(query, [asignaturaPlantillaId, grupo], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear la asignatura semestre.", err });
    }

    // Paso 2: Obtener el ID de la nueva asignatura creada desde la variable de salida
    const newAsignaturaId = result[1][0].new_as_id;

    // Si no se obtuvo un ID válido, devolver un error
    if (!newAsignaturaId) {
      return res.status(500).json({
        error: "No se pudo obtener el ID de la nueva asignatura semestre.",
      });
    }

    // Paso 3: Llamar al procedimiento PMAT_CrearConSalida para registrar el periodo de matrícula y obtener el ID
    const pmatCrearQuery = `
        CALL PMAT_CrearConSalida(?, ?, ?, @new_pmat_id);
        SELECT @new_pmat_id AS new_pmat_id;
      `;
    db.query(
      pmatCrearQuery,
      [periodoId, profesorId, evaluadorId],
      (err, pmatResult) => {
        if (err) {
          return res.status(500).json({
            error: "Error al registrar el periodo de matrícula.",
            err,
          });
        }

        // Obtener el ID del periodo de matrícula desde la variable de salida
        const newPeriodoMatriculaId = pmatResult[1][0].new_pmat_id;

        // Si no se obtuvo un ID válido, devolver un error
        if (!newPeriodoMatriculaId) {
          return res.status(500).json({
            error: "No se pudo obtener el ID del periodo de matrícula.",
          });
        }

        // Paso 4: Crear matrículas para cada estudiante
        const matriculaPromises = estudiantes.map((estudianteId) => {
          return new Promise((resolve, reject) => {
            const matriculaQuery = `
              CALL Matricula_Crear(?, ?, ?);
            `;
            db.query(
              matriculaQuery,
              [estudianteId, newAsignaturaId, newPeriodoMatriculaId],
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          });
        });

        // Esperamos a que se registren todas las matrículas
        Promise.all(matriculaPromises)
          .then(() => {
            res.status(200).json({
              message:
                "La asignatura, periodo de matrícula y las matrículas fueron creadas exitosamente.",
              asignaturaId: newAsignaturaId,
              periodoMatriculaId: newPeriodoMatriculaId,
            });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: "Error al registrar las matrículas.", err });
          });
      }
    );
  });
});

//LISTAR LOS DATOS DE UNA MATRÍCULA POR PROGRAMA
router.get("/detalles_as/:id_periodo/:id_programa", (req, res) => {
  const { id_periodo, id_programa } = req.params;
  db.query(
    "CAll AS_ObtenerDetallesPorPeriodoYPrograma(?, ?)",
    [id_periodo, id_programa],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al obtener las matrículas");
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

//GENERAR INFORME
router.get("/informeasignatura/:id_pmat", (req, res) => {
  const { id_pmat } = req.params;
  db.query("CAll Informe_MatriculaAsignatura(?)", [id_pmat], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener");
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = router;
