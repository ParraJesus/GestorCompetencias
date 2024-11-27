/* --------------------------------- MATRÍCULA --------------------------------- */

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE Matricula_Crear(
    IN p_as_id INT,
    IN p_estudiante_id INT,
    IN p_pmat_id INT
)
BEGIN
    INSERT INTO MATRICULA (
        AS_ID, ESTUDIANTE_ID, PMAT_ID
    ) VALUES (
        p_as_id, p_estudiante_id, p_estudiante_id
    );
END //
DELIMITER ;


/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE Matricula_Editar(
	IN p_matricula_id INT,
    IN p_as_id INT,
    IN p_estudiante_id INT,
    IN p_pmat_id INT
)
BEGIN
    UPDATE MATRICULA SET
        AS_ID = p_as_id, ESTUDIANTE_ID = p_estudiante_id, PMAT_ID = p_pmat_id
	WHERE MATRICULA_ID = p_matricula_id;
END //
DELIMITER ;

