/* --------------------------------- ESTUDIANTE --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerOrdenados()
BEGIN
    SELECT * FROM estudiante
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM estudiante
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerPorApellido(
	IN p_apellido VARCHAR(255)
)
BEGIN
    SELECT * FROM estudiante
    WHERE APELLIDO LIKE CONCAT(p_apellido, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM estudiante
    WHERE ESTUDIANTE_ID LIKE CONCAT(p_id, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerUnicoPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM estudiante
    WHERE ESTUDIANTE_ID LIKE p_id
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Estudiante_ObtenerPorDocumento(
	IN p_doc VARCHAR(255)
)
BEGIN
    SELECT * FROM ESTUDIANTE
    WHERE DOCUMENTO LIKE CONCAT(p_doc, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE Estudiante_Crear(
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
    INSERT INTO ESTUDIANTE (
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
CREATE PROCEDURE Estudiante_Editar(
    IN p_estudiante_id INT,
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
    UPDATE ESTUDIANTE
    SET DOCUMENTO = p_documento,
        TIPO_DOCUMENTO = p_tipo_documento,
        NOMBRE = p_nombre,
        APELLIDO = p_apellido,
        USUARIO = p_usuario,
        CONTRASENA = p_contrasena,
        CORREO_INSTITUCIONAL = p_correo_institucional,
        ESTADO = p_estado
    WHERE ESTUDIANTE_ID = p_estudiante_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE Estudiante_Deshabilitar(IN p_estudiante_id INT)
BEGIN
    UPDATE ESTUDIANTE
    SET ESTADO = '0'
    WHERE ESTUDIANTE_ID = p_estudiante_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE Estudiante_Habilitar(IN p_estudiante_id INT)
BEGIN
    UPDATE ESTUDIANTE
    SET ESTADO = '1'
    WHERE ESTUDIANTE_ID = p_estudiante_id;
END //
DELIMITER ;