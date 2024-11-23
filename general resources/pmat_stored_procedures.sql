/* --------------------------------- PERIODO MATRÍCULA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE PMAT_ObtenerPorProgramaYPeriodo(
    IN p_programa_id INT,
    IN p_periodo_id INT
)
BEGIN
    SELECT 
        pm.PMAT_ID AS PERIODO_MATRICULA_ID,
        assem.NOMBRE AS NOMBRE_MATERIA,
        assem.GRUPO AS GRUPO_MATERIA,
        assem.AS_ID AS MATERIA_ID,
        m.MATRICULA_ID AS MATRICULA_ID,
        prof.PROF_ID AS PROFESOR_ID,
        CONCAT(prof.NOMBRE, ' ', prof.APELLIDO) AS NOMBRE_PROFESOR,
        eval.EVALUADOR_ID AS EVALUADOR_ID,
        CONCAT(eval.NOMBRE, ' ', eval.APELLIDO) AS NOMBRE_EVALUADOR,
        COUNT(DISTINCT m.ESTUDIANTE_ID) AS CANTIDAD_ESTUDIANTES
    FROM 
        PERIODO_MATRICULA pm
    INNER JOIN 
        MATRICULA m ON pm.MATRICULA_ID = m.MATRICULA_ID
    INNER JOIN 
        ASIGNATURA_SEMESTRE assem ON m.AS_ID = assem.AS_ID
    INNER JOIN 
        ASIGNATURA_PLANTILLA ap ON assem.AP_ID = ap.AP_ID
    INNER JOIN 
        PROGRAMA p ON ap.PROGRAMA_ID = p.PROGRAMA_ID
    INNER JOIN 
        PROFESOR prof ON pm.PROF_ID = prof.PROF_ID
    INNER JOIN 
        EVALUADOR_EXTERNO eval ON pm.EVALUADOR_ID = eval.EVALUADOR_ID
    WHERE 
        p.PROGRAMA_ID = p_programa_id
        AND pm.PERIODO_ID = p_periodo_id
    GROUP BY 
        pm.PMAT_ID, assem.NOMBRE, assem.GRUPO, assem.AS_ID, 
        m.MATRICULA_ID, prof.PROF_ID, prof.NOMBRE, prof.APELLIDO, 
        eval.EVALUADOR_ID, eval.NOMBRE, eval.APELLIDO;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE PMAT_Crear(
    IN p_periodo_id INT,
    IN p_prof_id INT,
    IN p_evaluador_id INT,
    IN p_matricula_id INT
)
BEGIN
    INSERT INTO PERIODO_MATRICULA (PERIODO_ID, PROF_ID, EVALUADOR_ID, MATRICULA_ID)
    VALUES (p_periodo_id, p_prof_id, p_evaluador_id, p_matricula_id);
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE PMAT_Editar(
    IN p_pmat_id INT,
    IN p_periodo_id INT,
    IN p_prof_id INT,
    IN p_evaluador_id INT,
    IN p_matricula_id INT
)
BEGIN
    UPDATE PERIODO_MATRICULA
    SET 
        PERIODO_ID = p_periodo_id,
        PROF_ID = p_prof_id,
        EVALUADOR_ID = p_evaluador_id,
        MATRICULA_ID = p_matricula_id
    WHERE PMAT_ID = p_pmat_id;
END //
DELIMITER ;




