/* --------------------------------- MATRÍCULA --------------------------------- */

/*	CREAR	*/

DELIMITER $$
CREATE PROCEDURE Matricula_Crear(
    IN p_estudiante_id INT,  -- ID del estudiante
    IN p_as_id INT,          -- ID de la asignatura semestre
    IN p_pmat_id INT         -- ID del período de matrícula
)
BEGIN
    -- Verificar si el estudiante existe
    IF NOT EXISTS (
        SELECT 1 
        FROM ESTUDIANTE 
        WHERE ESTUDIANTE_ID = p_estudiante_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El estudiante no existe.';
    END IF;

    -- Verificar si la asignatura semestre existe
    IF NOT EXISTS (
        SELECT 1 
        FROM ASIGNATURA_SEMESTRE 
        WHERE AS_ID = p_as_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La asignatura semestre no existe.';
    END IF;

    -- Verificar si el período de matrícula existe
    IF NOT EXISTS (
        SELECT 1 
        FROM PERIODO_MATRICULA 
        WHERE PMAT_ID = p_pmat_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El período de matrícula no existe.';
    END IF;

    -- Verificar si ya existe una matrícula para este estudiante, asignatura y período
    IF EXISTS (
        SELECT 1 
        FROM MATRICULA 
        WHERE ESTUDIANTE_ID = p_estudiante_id 
          AND AS_ID = p_as_id 
          AND PMAT_ID = p_pmat_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El estudiante ya está matriculado en esta asignatura para el período especificado.';
    END IF;

    -- Insertar la nueva matrícula
    INSERT INTO MATRICULA (PMAT_ID, AS_ID, ESTUDIANTE_ID)
    VALUES (p_pmat_id, p_as_id, p_estudiante_id);
END$$
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

