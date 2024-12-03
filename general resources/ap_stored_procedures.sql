/* --------------------------------- ASIGNATURA PLANTILLA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE AP_ObtenerPorID(
    IN p_asig_id INT
)
BEGIN
    SELECT 
        AP_ID,
        NOMBRE,
        DESCRIPCION,
        CREDITOS,
        SEMESTRE,
        HORAS_SEMANA,
        MODALIDAD,
        TIPO_MATERIA,
        ESTADO
    FROM ASIGNATURA_PLANTILLA
    WHERE AP_ID = p_asig_id
	ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AP_ObtenerPorProgramaYSemestre(
    IN p_programa_id INT,
    IN p_semestre INT
)
BEGIN
    SELECT 
        AP_ID,
        NOMBRE,
        DESCRIPCION,
        CREDITOS,
        HORAS_SEMANA,
        MODALIDAD,
        TIPO_MATERIA,
        ESTADO
    FROM ASIGNATURA_PLANTILLA
    WHERE PROGRAMA_ID = p_programa_id AND SEMESTRE = p_semestre
	ORDER BY ESTADO DESC;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE AP_ObtenerPorPrograma(
    IN programa_id INT
)
BEGIN
    SELECT 
        p.PROGRAMA_ID, 
        p.NOMBRE, 
        p.MODALIDAD, 
        p.TIPO_PROGRAMA, 
        p.FACULTAD,
        p.DURACION_SEMESTRES,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'SEMESTRE', a.SEMESTRE,
                'ASIGNATURAS', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'AP_ID', ap.AP_ID,
                            'AP_ESTADO', ap.ESTADO,
                            'AP_NOMBRE', ap.NOMBRE,
                            'AP_CREDITOS', ap.CREDITOS,
                            'AP_SEMESTRE', ap.SEMESTRE,
                            'AP_MODALIDAD', ap.MODALIDAD,
                            'AP_DESCRIPCION', ap.DESCRIPCION,
                            'AP_HORAS_SEMANA', ap.HORAS_SEMANA,
                            'AP_TIPO_MATERIA', ap.TIPO_MATERIA
                        )
                    )
                    FROM ASIGNATURA_PLANTILLA ap
                    WHERE ap.PROGRAMA_ID = p.PROGRAMA_ID
                    AND ap.SEMESTRE = a.SEMESTRE
                )
            )
        ) AS SEMESTRES
    FROM 
        programa p
    LEFT JOIN 
        (SELECT DISTINCT SEMESTRE, PROGRAMA_ID 
         FROM ASIGNATURA_PLANTILLA 
         WHERE PROGRAMA_ID = programa_id
         AND EXISTS (
             SELECT 1
             FROM ASIGNATURA_PLANTILLA ap
             WHERE ap.PROGRAMA_ID = programa_id
             AND ap.SEMESTRE = SEMESTRE
         )
        ) a 
    ON a.PROGRAMA_ID = p.PROGRAMA_ID
    WHERE 
        p.PROGRAMA_ID = programa_id
    GROUP BY 
        p.PROGRAMA_ID;
END//
DELIMITER ;







/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE AP_Crear(
    IN p_programa_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_creditos INT,
    IN p_semestre INT,
    IN p_horas_semana INT,
    IN p_modalidad VARCHAR(255),
    IN p_tipo_materia VARCHAR(255),
    IN p_estado ENUM('0', '1')
)
BEGIN
    INSERT INTO ASIGNATURA_PLANTILLA (
        PROGRAMA_ID, NOMBRE, DESCRIPCION, CREDITOS, SEMESTRE, HORAS_SEMANA, MODALIDAD, TIPO_MATERIA, ESTADO
    ) VALUES (
        p_programa_id, p_nombre, p_descripcion, p_creditos, p_semestre, p_horas_semana, p_modalidad, p_tipo_materia, p_estado
    );
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE AP_Editar(
    IN p_ap_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_creditos INT,
    IN p_semestre INT,
    IN p_horas_semana INT,
    IN p_modalidad VARCHAR(255),
    IN p_tipo_materia VARCHAR(255)
)
BEGIN
    UPDATE ASIGNATURA_PLANTILLA
    SET 
        NOMBRE = p_nombre,
        DESCRIPCION = p_descripcion,
        CREDITOS = p_creditos,
        SEMESTRE = p_semestre,
        HORAS_SEMANA = p_horas_semana,
        MODALIDAD = p_modalidad,
        TIPO_MATERIA = p_tipo_materia
    WHERE AP_ID = p_ap_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE AP_Deshabilitar(
    IN p_ap_id INT
)
BEGIN
    UPDATE ASIGNATURA_PLANTILLA
    SET ESTADO = '0'
    WHERE AP_ID = p_ap_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE AP_Habilitar(
    IN p_ap_id INT
)
BEGIN
    UPDATE ASIGNATURA_PLANTILLA
    SET ESTADO = '1'
    WHERE AP_ID = p_ap_id;
END //
DELIMITER ;




