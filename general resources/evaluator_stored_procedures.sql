/* --------------------------------- EVALUADOR --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerOrdenados()
BEGIN
    SELECT * FROM evaluador_externo
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM EVALUADOR_EXTERNO
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerPorApellido(
	IN p_apellido VARCHAR(255)
)
BEGIN
    SELECT * FROM evaluador_externo
    WHERE APELLIDO LIKE CONCAT(p_apellido, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM evaluador_externo
    WHERE EVALUADOR_ID LIKE CONCAT(p_id, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerUnicoPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM evaluador_externo
    WHERE EVALUADOR_ID LIKE p_id
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Evaluador_ObtenerPorDocumento(
	IN p_doc VARCHAR(255)
)
BEGIN
    SELECT * FROM EVALUADOR_EXTERNO
    WHERE DOCUMENTO LIKE CONCAT(p_doc, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE Evaluador_Crear(
    IN p_documento VARCHAR(255),
    IN p_tipo_documento VARCHAR(255),
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_correo_institucional VARCHAR(255),
    IN p_estado ENUM('0', '1')
)
BEGIN
    INSERT INTO EVALUADOR_EXTERNO (
        DOCUMENTO,
        TIPO_DOCUMENTO,
        NOMBRE,
        APELLIDO,
        USUARIO,
        CONTRASENA,
        CORREO_INSTITUCIONAL,
        ESTADO
    )
    VALUES (
        p_documento,
        p_tipo_documento,
        p_nombre,
        p_apellido,
        p_usuario,
        p_contrasena,
        p_correo_institucional,
        p_estado
    );
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE Evaluador_Editar(
    IN p_evaluador_id INT,
    IN p_documento VARCHAR(255),
    IN p_tipo_documento VARCHAR(255),
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_correo_institucional VARCHAR(255)
)
BEGIN
    UPDATE EVALUADOR_EXTERNO
    SET DOCUMENTO = p_documento,
        TIPO_DOCUMENTO = p_tipo_documento,
        NOMBRE = p_nombre,
        APELLIDO = p_apellido,
        USUARIO = p_usuario,
        CONTRASENA = p_contrasena,
        CORREO_INSTITUCIONAL = p_correo_institucional
    WHERE EVALUADOR_ID = p_evaluador_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE Evaluador_Deshabilitar(IN p_evaluador_id INT)
BEGIN
    UPDATE EVALUADOR_EXTERNO
    SET ESTADO = '0'
    WHERE EVALUADOR_ID = p_evaluador_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE Evaluador_Habilitar(IN p_evaluador_id INT)
BEGIN
    UPDATE EVALUADOR_EXTERNO
    SET ESTADO = '1'
    WHERE EVALUADOR_ID = p_evaluador_id;
END //
DELIMITER ;