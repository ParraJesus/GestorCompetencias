/* --------------------------------- PROGRAMA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE Programa_ObtenerOrdenados()
BEGIN
    SELECT * FROM programa
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Programa_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM programa
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Programa_ObtenerPorTipo(
	IN p_tipo VARCHAR(255)
)
BEGIN
    SELECT * FROM programa
    WHERE TIPO_PROGRAMA LIKE CONCAT(p_tipo, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Programa_ObtenerPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM programa
    WHERE PROGRAMA_ID LIKE CONCAT(p_id, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Programa_ObtenerPorFacultad(
	IN p_facultad VARCHAR(255)
)
BEGIN
    SELECT * FROM programa
    WHERE FACULTAD LIKE CONCAT(p_facultad, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE Programa_Crear(
    IN p_coordinador_id INT,
    IN p_nombre VARCHAR(255),
    IN p_duracion_semestres INT,
    IN p_titulo VARCHAR(255),
    IN p_modalidad VARCHAR(255),
    IN p_facultad VARCHAR(255),
    IN p_tipo_programa VARCHAR(255),
    IN p_estado ENUM('0', '1')
)
BEGIN
    INSERT INTO PROGRAMA (
        COORDINADOR_ID,
        NOMBRE,
        DURACION_SEMESTRES,
        TITULO,
        MODALIDAD,
        FACULTAD,
        TIPO_PROGRAMA,
        ESTADO
    )
    VALUES (
        p_coordinador_id,
        p_nombre,
        p_duracion_semestres,
        p_titulo,
        p_modalidad,
        p_facultad,
        p_tipo_programa,
        p_estado
    );
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE Programa_Editar(
    IN p_programa_id INT,
    IN p_coordinador_id INT,
    IN p_nombre VARCHAR(255),
    IN p_duracion_semestres INT,
    IN p_titulo VARCHAR(255),
    IN p_modalidad VARCHAR(255),
    IN p_facultad VARCHAR(255),
    IN p_tipo_programa VARCHAR(255)
)
BEGIN
    UPDATE PROGRAMA
    SET COORDINADOR_ID = p_coordinador_id,
        NOMBRE = p_nombre,
        DURACION_SEMESTRES = p_duracion_semestres,
        TITULO = p_titulo,
        MODALIDAD = p_modalidad,
        FACULTAD = p_facultad,
        TIPO_PROGRAMA = p_tipo_programa
    WHERE PROGRAMA_ID = p_programa_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE Programa_Deshabilitar(IN p_programa_id INT)
BEGIN
    UPDATE PROGRAMA
    SET ESTADO = '0'
    WHERE PROGRAMA_ID = p_programa_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE Programa_Habilitar(IN p_programa_id INT)
BEGIN
    UPDATE PROGRAMA
    SET ESTADO = '1'
    WHERE PROGRAMA_ID = p_programa_id;
END //
DELIMITER ;
