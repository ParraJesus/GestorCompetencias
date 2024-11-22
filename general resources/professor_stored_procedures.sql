/* --------------------------------- PROFESOR --------------------------------- */

/*	OBTENER	*/
DELIMITER //
CREATE PROCEDURE Profesor_ObtenerOrdenados()
BEGIN
    SELECT * FROM PROFESOR
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

/*	CREAR	*/
DELIMITER //
CREATE PROCEDURE Profesor_Crear(
    IN p_documento VARCHAR(255),
    IN p_tipo_documento VARCHAR(255),
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_correo_institucional VARCHAR(255),
    IN p_tipo_docente VARCHAR(255),
    IN p_ultimo_titulo VARCHAR(255),
    IN p_estado ENUM('0', '1')
)
BEGIN
    INSERT INTO PROFESOR (
        DOCUMENTO,
        TIPO_DOCUMENTO,
        NOMBRE,
        APELLIDO,
        USUARIO,
        CONTRASENA,
        CORREO_INSTITUCIONAL,
        TIPO_DOCENTE,
        ULTIMO_TITULO,
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
        p_tipo_docente,
        p_ultimo_titulo,
        p_estado
    );
END //
DELIMITER ;

/*	EDITAR	*/
DELIMITER //
CREATE PROCEDURE Profesor_Editar(
    IN p_prof_id INT,
    IN p_documento VARCHAR(255),
    IN p_tipo_documento VARCHAR(255),
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_correo_institucional VARCHAR(255),
    IN p_tipo_docente VARCHAR(255),
    IN p_ultimo_titulo VARCHAR(255)
)
BEGIN
    UPDATE PROFESOR
    SET DOCUMENTO = p_documento,
        TIPO_DOCUMENTO = p_tipo_documento,
        NOMBRE = p_nombre,
        APELLIDO = p_apellido,
        USUARIO = p_usuario,
        CONTRASENA = p_contrasena,
        CORREO_INSTITUCIONAL = p_correo_institucional,
        TIPO_DOCENTE = p_tipo_docente,
        ULTIMO_TITULO = p_ultimo_titulo
    WHERE PROF_ID = p_prof_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/
DELIMITER //
CREATE PROCEDURE Profesor_Deshabilitar(IN p_prof_id INT)
BEGIN
    UPDATE PROFESOR
    SET ESTADO = '0'
    WHERE PROF_ID = p_prof_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE Profesor_Habilitar(IN p_profesor_id INT)
BEGIN
    UPDATE PROFESOR
    SET ESTADO = '1'
    WHERE PROFESOR_ID = p_profesor_id;
END //
DELIMITER ;

