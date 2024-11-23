/* --------------------------------- RESULTADOS DE APRENDIZAJE DE RROGRAMA --------------------------------- */

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE Coor_Editar(
    IN p_coor_id INT,
    IN p_documento VARCHAR(255),
    IN p_tipo_documento VARCHAR(255),
    IN p_nombre VARCHAR(255),
    IN p_apellido VARCHAR(255),
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_correo_institucional VARCHAR(255)
)
BEGIN
    UPDATE COORDINADOR
    SET DOCUMENTO = p_documento,
        TIPO_DOCUMENTO = p_tipo_documento,
        NOMBRE = p_nombre,
        APELLIDO = p_apellido,
        USUARIO = p_usuario,
        CONTRASENA = p_contrasena,
        CORREO_INSTITUCIONAL = p_correo_institucional
    WHERE COORDINADOR_ID = p_coor_id;
END //
DELIMITER ;