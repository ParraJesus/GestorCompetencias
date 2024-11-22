/* --------------------------------- ASIGNATURA PLANTILLA --------------------------------- */

/*	OBTENER	*/

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




