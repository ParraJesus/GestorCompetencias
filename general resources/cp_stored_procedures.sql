/* --------------------------------- COMPETENCIA PROGRAMA --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE CP_ObtenerOrdenados()
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CP_ObtenerPorID(
	IN p_ID INT
)
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    WHERE CP_ID LIKE CONCAT(p_ID, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE CP_ObtenerPorNombre(
	IN p_nombre VARCHAR(255)
)
BEGIN
    SELECT * FROM COMPETENCIA_PROGRAMA
    WHERE NOMBRE LIKE CONCAT(p_nombre, '%')
    ORDER BY ESTADO DESC;
END //
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE CP_ObtenerUnicoConDetalles (
    IN competencia_id INT
)
BEGIN
    SELECT JSON_OBJECT(
        'CP_ID', CP.CP_ID,
        'PROGRAMA_ID', CP.PROGRAMA_ID,
        'NOMBRE', CP.NOMBRE,
        'DESCRIPCION', CP.DESCRIPCION,
        'NIVEL', CP.NIVEL,
        'PONDERACION', CP.PONDERACION,
        'ESTADO', CP.ESTADO,
        'RESULTADOS_APRENDIZAJE', (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'RAP_ID', RAP.RAP_ID,
                    'DESCRIPCION', RAP.DESCRIPCION,
                    'PONDERACION', RAP.PONDERACION,
                    'RUBRICAS_EVALUACION', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'RUP_ID', RUP.RUP_ID,
                                'DESCRIPCION', RUP.DESCRIPCION,
                                'PONDERACION', RUP.PONDERACION
                            )
                        )
                        FROM RUP
                        WHERE RUP.RAP_ID = RAP.RAP_ID
                    )
                )
            )
            FROM RAP
            WHERE RAP.CP_ID = CP.CP_ID
        )
    ) AS CompetenciaJSON
    FROM COMPETENCIA_PROGRAMA CP
    WHERE CP.CP_ID = competencia_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE CP_ObtenerConDetallesPorPrograma (
    IN programa_id INT
)
BEGIN
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'CP_ID', CP.CP_ID,
            'PROGRAMA_ID', CP.PROGRAMA_ID,
            'NOMBRE', CP.NOMBRE,
            'DESCRIPCION', CP.DESCRIPCION,
            'NIVEL', CP.NIVEL,
            'PONDERACION', CP.PONDERACION,
            'ESTADO', CP.ESTADO,
            'RESULTADOS_APRENDIZAJE', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'RAP_ID', RAP.RAP_ID,
                        'DESCRIPCION', RAP.DESCRIPCION,
                        'PONDERACION', RAP.PONDERACION,
                        'RUBRICAS_EVALUACION', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'RUP_ID', RUP.RUP_ID,
                                    'DESCRIPCION', RUP.DESCRIPCION,
                                    'PONDERACION', RUP.PONDERACION
                                )
                            )
                            FROM RUP
                            WHERE RUP.RAP_ID = RAP.RAP_ID
                        )
                    )
                )
                FROM RAP
                WHERE RAP.CP_ID = CP.CP_ID
            )
        )
    ) AS CompetenciasJSON
    FROM COMPETENCIA_PROGRAMA CP
    WHERE CP.PROGRAMA_ID = programa_id;
END$$
DELIMITER ;

/*	CREAR	*/

DELIMITER //
CREATE PROCEDURE CP_Crear(
    IN p_programa_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_nivel VARCHAR(255),
    IN p_ponderacion DECIMAL(5,2),
    IN p_estado enum('0', '1'),
    OUT new_id INT
)
BEGIN
    INSERT INTO competencia_programa (
		PROGRAMA_ID,
        NOMBRE,
        DESCRIPCION,
        NIVEL,
        PONDERACION,
        ESTADO
    )
    VALUES (
        p_programa_id,
        p_nombre,
        p_descripcion,
        p_nivel,
        p_ponderacion,
        p_estado
    );
    SET new_id = LAST_INSERT_ID();
END //
DELIMITER ;

/*	EDITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Editar(
	IN p_competencia_id INT,
    IN p_programa_id INT,
    IN p_nombre VARCHAR(255),
    IN p_descripcion VARCHAR(255),
    IN p_nivel VARCHAR(255),
    IN p_ponderacion DECIMAL(5,2),
    IN p_estado enum('0', '1')
)
BEGIN
    UPDATE competencia_programa
    SET
		PROGRAMA_ID = p_programa_id,
        NOMBRE = p_nombre,
        DESCRIPCION = p_descripcion,
        NIVEL = p_nivel,
        PONDERACION = p_ponderacion,
        ESTADO = p_estado
	WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;

/*	DESHABILITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Deshabilitar(
	IN p_competencia_id INT
)
BEGIN
    UPDATE competencia_programa
    SET ESTADO = '0'
    WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;

/*	HABILITAR	*/

DELIMITER //
CREATE PROCEDURE CP_Habilitar(
	IN p_competencia_id INT
)
BEGIN
    UPDATE competencia_programa
    SET ESTADO = '1'
    WHERE CP_ID = p_competencia_id;
END //
DELIMITER ;