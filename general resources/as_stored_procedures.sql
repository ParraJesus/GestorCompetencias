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







