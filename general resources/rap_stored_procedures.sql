/* --------------------------------- RESULTADO DE APRENDIZAJE DE PROGRAMA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE RAP_ObtenerPorCompetencia(
    IN p_cp_id INT
)
BEGIN
    SELECT 
        RAP_ID,
        CP_ID,
        DESCRIPCION,
        PONDERACION
    FROM RAP
    WHERE CP_ID = p_cp_id;
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE RAP_Crear(
	IN p_cp_id INT,
    IN p_description TEXT,
    IN p_ponderacion DECIMAL(5,2)
)
BEGIN
	INSERT INTO RAP(
		CP_ID,
		DESCRIPCION,
        PONDERACION
    )
    VALUES(
		p_cp_id,
        p_description,
        p_ponderacion
    );
END //
DELIMITER ;


/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE RAP_Editar(
	IN p_rap_id INT,
	IN p_cp_id INT,
    IN p_description TEXT,
    IN p_ponderacion DECIMAL(5,2)
)
BEGIN
	UPDATE RAP
    SET
		CP_ID = p_cp_id,
		DESCRIPCION = p_description,
        PONDERACION = p_ponderacion
    WHERE RAP_ID = p_rap_id;
END //
DELIMITER ;





