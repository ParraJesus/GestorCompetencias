/* --------------------------------- PROFESOR --------------------------------- */

/*	OBTENER	*/
DELIMITER //
CREATE PROCEDURE Profesor_ObtenerOrdenados()
BEGIN
    SELECT * FROM PROFESOR
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorApellido(
	IN p_apellido VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE APELLIDO LIKE CONCAT(p_apellido, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorTitulo(
	IN p_titulo VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE ULTIMO_TITULO LIKE CONCAT(p_titulo, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorTipo(
	IN p_tipo VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE TIPO_DOCENTE LIKE CONCAT(p_tipo,  '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorID(
	IN p_id VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE PROF_ID LIKE CONCAT(p_id, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerPorDocumento(
	IN p_doc VARCHAR(255)
)
BEGIN
    SELECT * FROM PROFESOR
    WHERE DOCUMENTO LIKE CONCAT(p_doc, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Profesor_ObtenerOrdenadosPorID()
BEGIN
    SELECT * FROM PROFESOR
    ORDER BY PROF_ID ASC;
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

