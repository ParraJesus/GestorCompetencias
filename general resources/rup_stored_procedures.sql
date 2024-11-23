/* --------------------------------- RESULTADOS DE APRENDIZAJE DE RROGRAMA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE RUP_ObtenerPorRAP(
    IN p_rap_id INT
)
BEGIN
    SELECT 
        RUP_ID,
        DESCRIPCION,
        PONDERACION
    FROM RUP
    WHERE RAP_ID = p_rap_id;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE RUP_Crear(
	IN p_rap_id INT,
    IN p_description TEXT,
    IN p_ponderacion DECIMAL(5,2)
)
BEGIN
	INSERT INTO RUP(
		RAP_ID,
		DESCRIPCION,
        PONDERACION
    )
    VALUES(
		p_rap_id,
        p_description,
        p_ponderacion
    );
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE RUP_Editar(
	IN p_rup_id INT,
	IN p_rap_id INT,
    IN p_description TEXT,
    IN p_ponderacion DECIMAL(5,2)
)
BEGIN
	UPDATE RUP
    SET
		RAP_ID = p_rap_id,
		DESCRIPCION = p_description,
        PONDERACION = p_ponderacion
    WHERE RUP_ID = p_rup_id;
END //
DELIMITER ;

