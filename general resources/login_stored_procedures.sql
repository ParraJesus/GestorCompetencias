/*	COMPROBAR USUARIO	*/

DELIMITER $$
CREATE PROCEDURE Login_Autenticar(
    IN p_usuario VARCHAR(255),
    IN p_contrasena VARCHAR(255)
)
BEGIN
    -- Variable para almacenar el tipo de usuario
    DECLARE v_tipo_usuario VARCHAR(50);
    DECLARE v_estado ENUM('0', '1');

    -- Intentar encontrar al usuario en las tablas
    SELECT 'estudiante' AS tipo_usuario, ESTADO
    INTO v_tipo_usuario, v_estado
    FROM estudiante
    WHERE USUARIO = p_usuario AND CONTRASENA = p_contrasena
    LIMIT 1;

    -- Si el usuario se encontró, devolver el resultado
    IF v_tipo_usuario IS NOT NULL THEN
        SELECT v_tipo_usuario AS tipo_usuario, v_estado AS estado;
    ELSE
        -- Intentar en la tabla profesor
        SELECT 'profesor' AS tipo_usuario, ESTADO
        INTO v_tipo_usuario, v_estado
        FROM profesor
        WHERE USUARIO = p_usuario AND CONTRASENA = p_contrasena
        LIMIT 1;

        IF v_tipo_usuario IS NOT NULL THEN
            SELECT v_tipo_usuario AS tipo_usuario, v_estado AS estado;
        ELSE
            -- Intentar en la tabla evaluador
            SELECT 'evaluador' AS tipo_usuario, ESTADO
            INTO v_tipo_usuario, v_estado
            FROM evaluador_externo
            WHERE USUARIO = p_usuario AND CONTRASENA = p_contrasena
            LIMIT 1;

            IF v_tipo_usuario IS NOT NULL THEN
                SELECT v_tipo_usuario AS tipo_usuario, v_estado AS estado;
            ELSE
                -- Intentar en la tabla coordinador
                SELECT 'coordinador' AS tipo_usuario, ESTADO
                INTO v_tipo_usuario, v_estado
                FROM coordinador
                WHERE USUARIO = p_usuario AND CONTRASENA = p_contrasena
                LIMIT 1;

                IF v_tipo_usuario IS NOT NULL THEN
                    SELECT v_tipo_usuario AS tipo_usuario, v_estado AS estado;
                ELSE
                    -- Si no se encuentra en ninguna tabla
                    SELECT NULL AS tipo_usuario, NULL AS estado;
                END IF;
            END IF;
        END IF;
    END IF;
END$$
DELIMITER ;

call login_autenticar('jgparra', '1234');