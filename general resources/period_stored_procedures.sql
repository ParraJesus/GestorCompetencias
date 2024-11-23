/* --------------------------------- ASIGNATURA PLANTILLA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE Periodo_Obtener()
BEGIN
    SELECT * FROM Periodo;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Periodo_ObtenerPorAno(
	IN p_ano INT
)
BEGIN
    SELECT * FROM Periodo
    WHERE ANO LIKE CONCAT('%', p_ano, '%');
END //
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE Periodo_Crear(
    IN p_ano INT,
    IN p_ciclo VARCHAR(255)
)
BEGIN
    INSERT INTO PROFESOR (
        ANO,
        CICLO
    )
    VALUES (
        p_ano,
        p_ciclo
    );
END //
DELIMITER ;


