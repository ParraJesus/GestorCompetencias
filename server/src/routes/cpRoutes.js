const express = require("express");
const router = express.Router();
const db = require("../db");

/* SECCIÓN DE COMPETENCIAS DEL PROGRAMA */

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

//OBTENER ÚNICO POR ID
router.get("/competencia/:id_cp", (req, res) => {
  const { id_cp } = req.params;
  db.query("CALL CP_ObtenerUnicoConDetalles(?)", [id_cp], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send(`Error al obtener las competencias del programa ${id_cp}`);
    } else if (result[0].length === 0) {
      res.status(404).send("Lista de competencias vacías o no encontradas");
    } else {
      res.send(result[0][0]);
    }
  });
});

//CREAR
router.post("/", (req, res) => {
  const { programa_id, nombre, descripcion, nivel, p_ponderacion, p_estado } =
    req.body;

  db.query(
    "CALL CP_Crear(?, ?, ?, ?, ?, ?,)",
    [programa_id, nombre, descripcion, nivel, p_ponderacion, p_estado],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar");
      } else {
        res.send("Registrado con éxito");
      }
    }
  );
});

//EDITAR
router.put("/", (req, res) => {
  const {
    competencia_id,
    programa_id,
    nombre,
    descripcion,
    nivel,
    p_ponderacion,
    p_estado,
  } = req.body;

  db.query(
    "CALL CP_Editar(?, ?, ?, ?, ?, ?, ?,)",
    [
      competencia_id,
      programa_id,
      nombre,
      descripcion,
      nivel,
      p_ponderacion,
      p_estado,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        res.send("éxito");
      }
    }
  );
});

/* SECCIÓN DE RAP */

//CREAR
router.post("/rap", (req, res) => {
  const { cp_id, descripcion, p_ponderacion } = req.body;

  db.query(
    "CALL RAP_Crear(?, ?, ?, ?, ?, ?,)",
    [cp_id, descripcion, p_ponderacion],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar");
      } else {
        res.send("Registrado con éxito");
      }
    }
  );
});

//EDITAR
router.put("/rap", (req, res) => {
  const { rap_id, cp_id, descripcion, p_ponderacion } = req.body;

  db.query(
    "CALL RAP_Editar(?, ?, ?, ?, ?, ?, ?,)",
    [rap_id, cp_id, descripcion, p_ponderacion],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        res.send("éxito");
      }
    }
  );
});

/* SECCIÓN DE RUP */

//CREAR
router.post("/rup", (req, res) => {
  const { rap_id, descripcion, p_ponderacion } = req.body;

  db.query(
    "CALL RUP_Crear(?, ?, ?, ?, ?, ?,)",
    [rap_id, descripcion, p_ponderacion],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar");
      } else {
        res.send("Registrado con éxito");
      }
    }
  );
});

//EDITAR
router.put("/rup", (req, res) => {
  const { rup_id, rap_id, cp_id, descripcion, p_ponderacion } = req.body;

  db.query(
    "CALL RUP_Editar(?, ?, ?, ?, ?, ?, ?,)",
    [rup_id, rap_id, cp_id, descripcion, p_ponderacion],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error");
      } else {
        res.send("éxito");
      }
    }
  );
});

/*SECCIÓN DE CREACIÓN TODO*/

router.post("/detalles", async (req, res) => {
  const {
    programa_id,
    nombre,
    p_descripcion,
    nivel,
    p_ponderacion,
    p_estado,
    resultados,
  } = req.body;

  try {
    // Iniciar la transacción
    await db.promise().query("START TRANSACTION");

    // Llamar a CP_Crear y obtener el ID de la competencia
    const [competenciaResult] = await db
      .promise()
      .query(
        "CALL CP_Crear(?, ?, ?, ?, ?, ?, @new_id); SELECT @new_id AS insertId;",
        [programa_id, nombre, p_descripcion, nivel, p_ponderacion, p_estado]
      );

    const competenciaId = competenciaResult[1][0]?.insertId;
    if (!competenciaId) {
      throw new Error("Error al obtener el ID de la competencia creada.");
    }

    // Iterar sobre los resultados de aprendizaje
    for (const resultado of resultados) {
      const {
        descripcion: descripcionRap,
        ponderacion: ponderacionRap,
        rubricas,
      } = resultado;

      const [rapResult] = await db
        .promise()
        .query(
          "CALL RAP_Crear(?, ?, ?, @new_id); SELECT @new_id AS insertId;",
          [competenciaId, descripcionRap, ponderacionRap]
        );

      const rapId = rapResult[1][0]?.insertId;
      if (!rapId) {
        throw new Error(
          "Error al obtener el ID del resultado de aprendizaje creado."
        );
      }

      for (const rubrica of rubricas) {
        const { descripcion: descripcionRup, ponderacion: ponderacionRup } =
          rubrica;

        await db
          .promise()
          .query("CALL RUP_Crear(?, ?, ?);", [
            rapId,
            descripcionRup,
            ponderacionRup,
          ]);
      }
    }

    // Confirmar la transacción
    await db.promise().query("COMMIT");

    res.send(
      "Competencia y todos los datos relacionados registrados con éxito."
    );
  } catch (error) {
    // Revertir la transacción en caso de error
    await db.promise().query("ROLLBACK");
    console.error("Error al registrar competencia:", error);
    res
      .status(500)
      .send(
        "Hubo un error al registrar la competencia y sus datos relacionados."
      );
  }
});

/*SECCIÓN DE EDITAR TODO*/

// Ruta para editar competencia y sus detalles
router.post("/detalles/:id_cp", async (req, res) => {
  const { id_cp } = req.params; // Obtener el ID de la competencia desde los parámetros de la URL
  const {
    competencia: {
      programa_id,
      nombre,
      p_descripcion,
      nivel,
      p_ponderacion,
      p_estado,
    },
    resultados,
  } = req.body; // Obtener los datos desde el cuerpo de la solicitud

  // Verificar que los valores no son nulos ni vacíos
  if (
    !programa_id ||
    !nombre ||
    !p_descripcion ||
    !nivel ||
    !p_ponderacion ||
    !p_estado
  ) {
    return res.status(400).send("Faltan parámetros necesarios.");
  }

  try {
    // Iniciar la transacción
    await db.promise().query("START TRANSACTION");

    // Llamar al procedimiento CP_Editar para actualizar la competencia
    await db.promise().query("CALL CP_Editar(?, ?, ?, ?, ?, ?, ?)", [
      id_cp, // ID de la competencia
      programa_id,
      nombre,
      p_descripcion,
      nivel,
      p_ponderacion,
      p_estado,
    ]);

    // Iterar sobre los resultados de aprendizaje
    for (const resultado of resultados) {
      const { rap_id, descripcion, ponderacion, rubricas } = resultado;

      // Llamar al procedimiento RAP_Editar para actualizar el resultado de aprendizaje
      await db.promise().query("CALL RAP_Editar(?, ?, ?, ?)", [
        rap_id, // ID del resultado de aprendizaje
        id_cp, // ID de la competencia
        descripcion,
        ponderacion,
      ]);

      // Iterar sobre las rúbricas y actualizarlas
      for (const rubrica of rubricas) {
        const {
          rup_id,
          descripcion: descripcionRup,
          ponderacion: ponderacionRup,
        } = rubrica;

        // Llamar al procedimiento RUP_Editar para actualizar las rúbricas
        await db.promise().query("CALL RUP_Editar(?, ?, ?, ?)", [
          rup_id, // ID de la rúbrica
          rap_id, // ID del resultado de aprendizaje
          descripcionRup,
          ponderacionRup,
        ]);
      }
    }

    // Confirmar la transacción
    await db.promise().query("COMMIT");

    res.send(
      "Competencia y todos los datos relacionados actualizados con éxito."
    );
  } catch (error) {
    // Revertir la transacción en caso de error
    await db.promise().query("ROLLBACK");
    console.error("Error al actualizar competencia:", error);
    res
      .status(500)
      .send(
        "Hubo un error al actualizar la competencia y sus datos relacionados."
      );
  }
});

module.exports = router;
