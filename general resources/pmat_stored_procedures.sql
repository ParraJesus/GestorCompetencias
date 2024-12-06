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
CREATE PROCEDURE PMAT_CrearConSalida(
    IN p_periodo_id INT,
    IN p_prof_id INT,
    IN p_evaluador_id INT,
     OUT new_pmat_id INT
)
BEGIN
    INSERT INTO PERIODO_MATRICULA (PERIODO_ID, PROF_ID, EVALUADOR_ID)
    VALUES (p_periodo_id, p_prof_id, p_evaluador_id);
    SET new_pmat_id = LAST_INSERT_ID();
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE PMAT_Crear(
    IN p_periodo_id INT,
    IN p_prof_id INT,
    IN p_evaluador_id INT
)
BEGIN
    INSERT INTO PERIODO_MATRICULA (PERIODO_ID, PROF_ID, EVALUADOR_ID)
    VALUES (p_periodo_id, p_prof_id, p_evaluador_id);
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE PMAT_Editar(
    IN p_pmat_id INT,
    IN p_periodo_id INT,
    IN p_prof_id INT,
    IN p_evaluador_id INT
)
BEGIN
    UPDATE PERIODO_MATRICULA
    SET 
        PERIODO_ID = p_periodo_id,
        PROF_ID = p_prof_id,
        EVALUADOR_ID = p_evaluador_id
    WHERE PMAT_ID = p_pmat_id;
END //
DELIMITER ;

/*	INFORME	*/

DELIMITER $$

CREATE PROCEDURE Informe_MatriculaAsignatura(
    IN p_pmat_id INT
)
BEGIN
    SELECT 
        -- Detalles del período
        pmat.PERIODO_ID AS ID_Periodo,
        per.ANO AS Año,
        per.CICLO AS Ciclo,
        
        -- Detalles de la materia
        ap.AP_ID AS ID_MateriaPlantilla,
        as_sem.AS_ID AS ID_Materia,
        as_sem.NOMBRE AS Nombre_Materia,
        as_sem.GRUPO AS Grupo,
        
        -- Detalles del profesor
        prof.PROF_ID AS ID_Profesor,
        prof.NOMBRE AS Nombre_Profesor,
        prof.APELLIDO AS Apellido_Profesor,
        prof.ULTIMO_TITULO AS Titulo_Profesor,
        prof.CORREO_INSTITUCIONAL AS Correo_Profesor,
        
        -- Detalles del evaluador externo
        eval_ext.EVALUADOR_ID AS ID_Evaluador,
        eval_ext.NOMBRE AS Nombre_Evaluador,
        eval_ext.APELLIDO AS Apellido_Evaluador,
        eval_ext.CORREO_INSTITUCIONAL AS Correo_Evaluador,
        
        -- Competencias, RAs y rúbricas
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'Competencia', cp.NOMBRE,
                'ResultadosAprendizaje', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'RAANombre', rap.DESCRIPCION,
                            'RAAPonderacion', rap.PONDERACION
                        )
                    )
                    FROM RAA rap
                    WHERE rap.CS_ID IN (
                        SELECT CS_ID 
                        FROM AS_CS 
                        WHERE AS_ID = as_sem.AS_ID
                    )
                ),
                'Rubricas', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'RUANombre', rub.DESCRIPCION,
                            'RUAPonderacion', rub.PONDERACION
                        )
                    )
                    FROM RUA rub
                    WHERE rub.RAA_ID IN (
                        SELECT RAA_ID
                        FROM RAA
                        WHERE CS_ID IN (
                            SELECT CS_ID 
                            FROM AS_CS 
                            WHERE AS_ID = as_sem.AS_ID
                        )
                    )
                )
            )
        ) AS Competencias,
        
        -- Evaluaciones de profesor y evaluador
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'Evaluacion_Profesor', evalu_prof.NOTA,
                    'Evaluacion_Evaluador', evalu_eval.NOTA
                )
            )
            FROM EVALUACION_PROFESOR evalu_prof
            JOIN EVALUACION_EXTERNO evalu_eval 
                ON evalu_prof.RUA_ID = evalu_eval.RUA_ID
            WHERE evalu_prof.PROF_ID = prof.PROF_ID
              AND evalu_eval.EVALUADOR_ID = eval_ext.EVALUADOR_ID
              AND evalu_prof.RUA_ID IN (
                  SELECT RUA_ID 
                  FROM RUA
                  WHERE RAA_ID IN (
                      SELECT RAA_ID 
                      FROM RAA 
                      WHERE CS_ID IN (
                          SELECT CS_ID 
                          FROM AS_CS 
                          WHERE AS_ID = as_sem.AS_ID
                      )
                  )
              )
        ) AS Evaluaciones,
        
        -- Estudiantes
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'Nombre', est.NOMBRE,
                    'Apellido', est.APELLIDO
                )
            )
            FROM ESTUDIANTE est
            JOIN MATRICULA matr ON est.ESTUDIANTE_ID = matr.ESTUDIANTE_ID
            WHERE matr.PMAT_ID = p_pmat_id
        ) AS Estudiantes
    FROM 
        PERIODO_MATRICULA pmat
    INNER JOIN 
        PERIODO per ON pmat.PERIODO_ID = per.PERIODO_ID
    INNER JOIN 
        ASIGNATURA_SEMESTRE as_sem ON pmat.PMAT_ID = as_sem.AS_ID
    INNER JOIN 
        ASIGNATURA_PLANTILLA ap ON as_sem.AP_ID = ap.AP_ID
    INNER JOIN 
        PROFESOR prof ON pmat.PROF_ID = prof.PROF_ID
    INNER JOIN 
        EVALUADOR_EXTERNO eval_ext ON pmat.EVALUADOR_ID = eval_ext.EVALUADOR_ID
    INNER JOIN 
        AS_CS asc_map ON as_sem.AS_ID = asc_map.AS_ID
    INNER JOIN 
        COMPETENCIA_SEMESTRE cp ON asc_map.CS_ID = cp.CS_ID
    WHERE 
        pmat.PMAT_ID = p_pmat_id
    GROUP BY 
        pmat.PERIODO_ID, ap.AP_ID, as_sem.AS_ID, prof.PROF_ID, eval_ext.EVALUADOR_ID;
END$$

DELIMITER ;

select * from periodo_matricula;
CALL informe_MatriculaAsignatura(2);

























