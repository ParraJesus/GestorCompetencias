/* --------------------------------- COMPETENCIA PROGRAMA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE CP_ObtenerOrdenados()
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CP_ObtenerPorID(
	IN p_ID INT
)
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    WHERE CP_ID LIKE CONCAT(p_ID, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CP_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE CP_Crear(
    IN p_programa_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_nivel VARCHAR(255),
    IN p_ponderacion DECIMAL(5,2),
    IN p_estado enum('0', '1')
)
BEGIN
    INSERT INTO competencia_programa (
		PROGRAMA_ID,
        NOMBRE,
        DESCRIPCION,
        NIVEL,
        PONDERACION,
        ESTADO
    )
    VALUES (
        p_programa_id,
        p_nombre,
        p_descripcion,
        p_nivel,
        p_ponderacion,
        p_estado
    );
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Editar(
	IN p_competencia_id INT,
    IN p_programa_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_nivel VARCHAR(255),
    IN p_ponderacion DECIMAL(5,2),
    IN p_estado enum('0', '1')
)
BEGIN
    UPDATE competencia_programa
    SET
		PROGRAMA_ID = p_programa_id,
        NOMBRE = p_nombre,
        DESCRIPCION = p_descripcion,
        NIVEL = p_nivel,
        PONDERACION = p_ponderacion,
        ESTADO = p_estado
	WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Deshabilitar(
	IN p_competencia_id INT
)
BEGIN
    UPDATE competencia_programa
    SET ESTADO = '0'
    WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Habilitar(
	IN p_competencia_id INT
)
BEGIN
    UPDATE competencia_programa
    SET ESTADO = '1'
    WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;