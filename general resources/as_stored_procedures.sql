/* --------------------------------- ASIGNATURA DE SEMESTRE --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE AS_ObtenerPorProgramaYPeriodo(
    IN p_programa_id INT,
    IN p_periodo_id INT
)
BEGIN
    SELECT 
        assem.AS_ID,
        assem.NOMBRE,
        assem.DESCRIPCION,
        assem.GRUPO,
        assem.CREDITOS,
        assem.SEMESTRE,
        assem.MODALIDAD,
        assem.TIPO_MATERIA
    FROM 
        ASIGNATURA_SEMESTRE assem
    INNER JOIN 
        ASIGNATURA_PLANTILLA ap ON assem.AP_ID = ap.AP_ID
    INNER JOIN 
        PROGRAMA p ON ap.PROGRAMA_ID = p.PROGRAMA_ID
    INNER JOIN 
        PERIODO_MATRICULA pm ON pm.PERIODO_ID = p_periodo_id
    INNER JOIN 
        MATRICULA m ON m.AS_ID = assem.AS_ID AND m.MATRICULA_ID = pm.MATRICULA_ID
    WHERE 
        p.PROGRAMA_ID = p_programa_id;
END //
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE AS_ObtenerDetallesPorPeriodoYPrograma(
    IN p_periodo_id INT,
    IN p_programa_id INT
)
BEGIN
    SELECT 
        as_sem.NOMBRE AS NombreAsignatura,
        as_sem.GRUPO AS Grupo,
        as_sem.AS_ID AS ID_Asignatura,
        prof.NOMBRE AS NombreProfesor,
        prof.APELLIDO AS ApellidoProfesor,
        prof.PROF_ID AS ID_Profesor,
        eval_ext.NOMBRE AS NombreEvaluador,
        eval_ext.APELLIDO AS ApellidoEvaluador,
        eval_ext.EVALUADOR_ID AS ID_Evaluador,
        COUNT(matr.ESTUDIANTE_ID) AS CantidadEstudiantes
    FROM 
        ASIGNATURA_SEMESTRE as_sem
    INNER JOIN 
        ASIGNATURA_PLANTILLA ap ON as_sem.AP_ID = ap.AP_ID
    INNER JOIN 
        PROGRAMA prog ON ap.PROGRAMA_ID = prog.PROGRAMA_ID
    INNER JOIN 
        MATRICULA matr ON as_sem.AS_ID = matr.AS_ID
    INNER JOIN 
        PERIODO_MATRICULA pmat ON matr.PMAT_ID = pmat.PMAT_ID
    INNER JOIN 
        PROFESOR prof ON pmat.PROF_ID = prof.PROF_ID
    INNER JOIN 
        EVALUADOR_EXTERNO eval_ext ON pmat.EVALUADOR_ID = eval_ext.EVALUADOR_ID
    WHERE 
        pmat.PERIODO_ID = p_periodo_id
        AND prog.PROGRAMA_ID = p_programa_id
    GROUP BY 
        as_sem.NOMBRE, as_sem.GRUPO, as_sem.AS_ID, 
        prof.NOMBRE, prof.PROF_ID, 
        eval_ext.NOMBRE, eval_ext.EVALUADOR_ID;
END$$
DELIMITER ;


/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE AS_Crear(
    IN p_ap_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_grupo VARCHAR(255),
    IN p_semestre INT,
    IN p_modalidad VARCHAR(255),
    IN p_tipo_materia VARCHAR(255),
    IN p_creditos INT
)
BEGIN
    INSERT INTO ASIGNATURA_SEMESTRE (
        AP_ID, NOMBRE, DESCRIPCION, GRUPO, CREDITOS, SEMESTRE, MODALIDAD, TIPO_MATERIA
    ) VALUES (
        p_ap_id, p_nombre, p_descripcion, p_grupo, p_creditos, p_semestre, p_modalidad, p_tipo_materia
    );
END //
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE AS_CrearPorPlantilla(
    IN p_ap_id INT, -- ID de la asignatura plantilla
    IN p_grupo VARCHAR(255) -- Grupo para la nueva asignatura semestre
)
BEGIN
    DECLARE new_as_id INT;

    -- Paso 1: Crear una nueva asignatura_semestre basada en la asignatura_plantilla
    INSERT INTO ASIGNATURA_SEMESTRE (AP_ID, NOMBRE, DESCRIPCION, GRUPO, CREDITOS, SEMESTRE, MODALIDAD, TIPO_MATERIA)
    SELECT 
        AP_ID, NOMBRE, DESCRIPCION, p_grupo, CREDITOS, SEMESTRE, MODALIDAD, TIPO_MATERIA
    FROM 
        ASIGNATURA_PLANTILLA
    WHERE 
        AP_ID = p_ap_id;

    -- Obtener el ID de la nueva asignatura_semestre creada
    SET new_as_id = LAST_INSERT_ID();

    -- Paso 2: Crear competencias_semestre basadas en las competencias_programa asociadas
    INSERT INTO COMPETENCIA_SEMESTRE (NOMBRE, DESCRIPCION, NIVEL, PONDERACION)
    SELECT 
        cp.NOMBRE, cp.DESCRIPCION, cp.NIVEL, cp.PONDERACION
    FROM 
        COMPETENCIA_PROGRAMA cp
    INNER JOIN 
        AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
    WHERE 
        ap_cp.AP_ID = p_ap_id;

    -- Paso 3: Crear la relación AS_CS para las competencias_semestre creadas
    INSERT INTO AS_CS (AS_ID, CS_ID)
    SELECT 
        new_as_id, cs.CS_ID
    FROM 
        COMPETENCIA_SEMESTRE cs
    WHERE 
        cs.CS_ID IN (
            SELECT 
                cs_sub.CS_ID
            FROM 
                COMPETENCIA_SEMESTRE cs_sub
            JOIN COMPETENCIA_PROGRAMA cp_sub ON cs_sub.NOMBRE = cp_sub.NOMBRE
            JOIN AP_CP ap_cp_sub ON cp_sub.CP_ID = ap_cp_sub.CP_ID
            WHERE ap_cp_sub.AP_ID = p_ap_id
        );

    -- Paso 4: Crear resultados de aprendizaje (RAA) para competencias_semestre
    INSERT INTO RAA (CS_ID, DESCRIPCION, PONDERACION)
    SELECT 
        cs.CS_ID, rap.DESCRIPCION, rap.PONDERACION
    FROM 
        RAP rap
    INNER JOIN 
        COMPETENCIA_PROGRAMA cp ON rap.CP_ID = cp.CP_ID
    INNER JOIN 
        AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
    INNER JOIN 
        COMPETENCIA_SEMESTRE cs ON cp.NOMBRE = cs.NOMBRE
    WHERE 
        ap_cp.AP_ID = p_ap_id;

    -- Paso 5: Crear rúbricas de evaluación (RUA) para los RAA creados
    INSERT INTO RUA (RAA_ID, DESCRIPCION, PONDERACION)
    SELECT 
        raa.RAA_ID, rup.DESCRIPCION, rup.PONDERACION
    FROM 
        RAA raa
    INNER JOIN 
        RAP rap ON raa.DESCRIPCION = rap.DESCRIPCION
    INNER JOIN 
        RUP rup ON rap.RAP_ID = rup.RAP_ID
    WHERE 
        raa.CS_ID IN (
            SELECT 
                cs.CS_ID
            FROM 
                COMPETENCIA_SEMESTRE cs
                JOIN COMPETENCIA_PROGRAMA cp ON cs.NOMBRE = cp.NOMBRE
                JOIN AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
            WHERE ap_cp.AP_ID = p_ap_id
        );

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE AS_CrearPorPlantillaConSalida(
    IN p_ap_id INT, -- ID de la asignatura plantilla
    IN p_grupo VARCHAR(255), -- Grupo para la nueva asignatura semestre
    OUT new_as_id INT
)
BEGIN

    -- Paso 1: Crear una nueva asignatura_semestre basada en la asignatura_plantilla
    INSERT INTO ASIGNATURA_SEMESTRE (AP_ID, NOMBRE, DESCRIPCION, GRUPO, CREDITOS, SEMESTRE, MODALIDAD, TIPO_MATERIA)
    SELECT 
        AP_ID, NOMBRE, DESCRIPCION, p_grupo, CREDITOS, SEMESTRE, MODALIDAD, TIPO_MATERIA
    FROM 
        ASIGNATURA_PLANTILLA
    WHERE 
        AP_ID = p_ap_id;

    -- Obtener el ID de la nueva asignatura_semestre creada
    SET new_as_id = LAST_INSERT_ID();

    -- Paso 2: Crear competencias_semestre basadas en las competencias_programa asociadas
    INSERT INTO COMPETENCIA_SEMESTRE (NOMBRE, DESCRIPCION, NIVEL, PONDERACION)
    SELECT 
        cp.NOMBRE, cp.DESCRIPCION, cp.NIVEL, cp.PONDERACION
    FROM 
        COMPETENCIA_PROGRAMA cp
    INNER JOIN 
        AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
    WHERE 
        ap_cp.AP_ID = p_ap_id;

    -- Paso 3: Crear la relación AS_CS para las competencias_semestre creadas
    INSERT INTO AS_CS (AS_ID, CS_ID)
    SELECT 
        new_as_id, cs.CS_ID
    FROM 
        COMPETENCIA_SEMESTRE cs
    WHERE 
        cs.CS_ID IN (
            SELECT 
                cs_sub.CS_ID
            FROM 
                COMPETENCIA_SEMESTRE cs_sub
            JOIN COMPETENCIA_PROGRAMA cp_sub ON cs_sub.NOMBRE = cp_sub.NOMBRE
            JOIN AP_CP ap_cp_sub ON cp_sub.CP_ID = ap_cp_sub.CP_ID
            WHERE ap_cp_sub.AP_ID = p_ap_id
        );

    -- Paso 4: Crear resultados de aprendizaje (RAA) para competencias_semestre
    INSERT INTO RAA (CS_ID, DESCRIPCION, PONDERACION)
    SELECT 
        cs.CS_ID, rap.DESCRIPCION, rap.PONDERACION
    FROM 
        RAP rap
    INNER JOIN 
        COMPETENCIA_PROGRAMA cp ON rap.CP_ID = cp.CP_ID
    INNER JOIN 
        AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
    INNER JOIN 
        COMPETENCIA_SEMESTRE cs ON cp.NOMBRE = cs.NOMBRE
    WHERE 
        ap_cp.AP_ID = p_ap_id;

    -- Paso 5: Crear rúbricas de evaluación (RUA) para los RAA creados
    INSERT INTO RUA (RAA_ID, DESCRIPCION, PONDERACION)
    SELECT 
        raa.RAA_ID, rup.DESCRIPCION, rup.PONDERACION
    FROM 
        RAA raa
    INNER JOIN 
        RAP rap ON raa.DESCRIPCION = rap.DESCRIPCION
    INNER JOIN 
        RUP rup ON rap.RAP_ID = rup.RAP_ID
    WHERE 
        raa.CS_ID IN (
            SELECT 
                cs.CS_ID
            FROM 
                COMPETENCIA_SEMESTRE cs
                JOIN COMPETENCIA_PROGRAMA cp ON cs.NOMBRE = cp.NOMBRE
                JOIN AP_CP ap_cp ON cp.CP_ID = ap_cp.CP_ID
            WHERE ap_cp.AP_ID = p_ap_id
        );

END$$
DELIMITER ;


/*	ELIMINAR	*/

DELIMITER //
CREATE PROCEDURE AS_Editar(
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_grupo VARCHAR(255),
    IN p_modalidad VARCHAR(255),
    IN p_tipo_materia VARCHAR(255)
)
BEGIN
    UPDATE ASIGNATURA_SEMESTRE
    SET
        NOMBRE = p_nombre,
        DESCRIPCION = p_descripcion,
        GRUPO = p_grupo,
        MODALIDAD = p_modalidad,
        TIPO_MATERIA = p_tipo_materia
    WHERE
        AS_ID = p_as_id;
END //
DELIMITER ;

/*	ELIMINAR	*/

DELIMITER //
CREATE PROCEDURE AS_Eliminar(
    IN p_as_id INT
)
BEGIN
    -- Eliminar la asignatura semestre
    DELETE FROM ASIGNATURA_SEMESTRE
    WHERE AS_ID = p_as_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER AS_trigger_CascadaEliminar
AFTER DELETE ON ASIGNATURA_SEMESTRE
FOR EACH ROW
BEGIN
    -- Eliminar las relaciones de la asignatura con competencias semestres
    DELETE FROM AS_CS WHERE AS_ID = OLD.AS_ID;

    -- Eliminar competencias semestres relacionadas con la asignatura
    DELETE FROM COMPETENCIA_SEMESTRE 
    WHERE CS_ID IN (
        SELECT CS_ID 
        FROM AS_CS 
        WHERE AS_ID = OLD.AS_ID
    );

    -- Eliminar resultados de aprendizaje (RAA y RUA)
    DELETE FROM RUA WHERE RAA_ID IN (
        SELECT RAA_ID FROM RAA WHERE CS_ID IN (
            SELECT CS_ID FROM AS_CS WHERE AS_ID = OLD.AS_ID
        )
    );
    DELETE FROM RAA WHERE CS_ID IN (
        SELECT CS_ID FROM AS_CS WHERE AS_ID = OLD.AS_ID
    );

    -- Eliminar matrículas relacionadas
    DELETE FROM MATRICULA WHERE AS_ID = OLD.AS_ID;

    -- Eliminar evaluaciones relacionadas
    DELETE FROM EVALUACION_PROFESOR WHERE PMAT_ID IN (
        SELECT PMAT_ID FROM PERIODO_MATRICULA WHERE MATRICULA_ID IN (
            SELECT MATRICULA_ID FROM MATRICULA WHERE AS_ID = OLD.AS_ID
        )
    );
    DELETE FROM EVALUACION_EXTERNO WHERE PMAT_ID IN (
        SELECT PMAT_ID FROM PERIODO_MATRICULA WHERE MATRICULA_ID IN (
            SELECT MATRICULA_ID FROM MATRICULA WHERE AS_ID = OLD.AS_ID
        )
    );

    -- Eliminar relaciones en PERIODO_MATRICULA
    DELETE FROM PERIODO_MATRICULA WHERE MATRICULA_ID IN (
        SELECT MATRICULA_ID FROM MATRICULA WHERE AS_ID = OLD.AS_ID
    );
END //
DELIMITER ;







