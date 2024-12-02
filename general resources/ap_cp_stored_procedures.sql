/* --------------------------------- AC_CP --------------------------------- */

/*	OBTENER	*/

DELIMITER //
CREATE PROCEDURE AP_CP_ObtenerCompetenciasPorAsignatura(
    IN p_ap_id INT
)
BEGIN
    SELECT 
        CP.CP_ID,
        CP.PROGRAMA_ID,
        CP.NOMBRE,
        CP.DESCRIPCION,
        CP.NIVEL,
        CP.PONDERACION,
        CP.ESTADO
    FROM 
        AP_CP AS ACP
    INNER JOIN 
        COMPETENCIA_PROGRAMA AS CP
    ON 
        ACP.CP_ID = CP.CP_ID
    WHERE 
        ACP.AP_ID = p_ap_id;
END //
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE AP_CP_ObtenerCompetenciasConDetallesPorAsignatura(
    IN p_ap_id INT
)
BEGIN
    SELECT 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'CP_ID', c.CP_ID,
                'NOMBRE', c.NOMBRE,
                'DESCRIPCION', c.DESCRIPCION,
                'NIVEL', c.NIVEL,
                'PONDERACION', c.PONDERACION,
                'ESTADO', c.ESTADO,
                'RESULTADOS_APRENDIZAJE', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'RAP_ID', rap.RAP_ID,
                            'DESCRIPCION', rap.DESCRIPCION,
                            'PONDERACION', rap.PONDERACION,
                            'RUBRICAS_EVALUACION', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'RUP_ID', rup.RUP_ID,
                                        'DESCRIPCION', rup.DESCRIPCION,
                                        'PONDERACION', rup.PONDERACION
                                    )
                                )
                                FROM RUP rup
                                WHERE rup.RAP_ID = rap.RAP_ID
                            )
                        )
                    )
                    FROM RAP rap
                    WHERE rap.CP_ID = c.CP_ID
                )
            )
        ) AS CompetenciasJSON
    FROM COMPETENCIA_PROGRAMA c
    INNER JOIN AP_CP acp ON acp.CP_ID = c.CP_ID
    WHERE acp.AP_ID = p_ap_id;
END$$
DELIMITER ;

/*	CREAR	*/

DELIMITER $$

CREATE PROCEDURE AP_CP_Crear(
    IN p_ap_id INT,
    IN p_cp_id INT
)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la asignatura plantilla existe
    IF NOT EXISTS (
        SELECT 1
        FROM ASIGNATURA_PLANTILLA
        WHERE AP_ID = p_ap_id
    ) THEN
        SET msg = CONCAT('La asignatura plantilla con AP_ID = ', p_ap_id, ' no existe.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Verificar si la competencia existe
    IF NOT EXISTS (
        SELECT 1
        FROM COMPETENCIA_PROGRAMA
        WHERE CP_ID = p_cp_id
    ) THEN
        SET msg = CONCAT('La competencia con CP_ID = ', p_cp_id, ' no existe.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Verificar si ya existe la relación entre AP y CP
    IF EXISTS (
        SELECT 1
        FROM AP_CP
        WHERE AP_ID = p_ap_id AND CP_ID = p_cp_id
    ) THEN
        SET msg = CONCAT('La relación entre AP_ID = ', p_ap_id, ' y CP_ID = ', p_cp_id, ' ya existe.');
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = msg;
    END IF;

    -- Insertar la relación en AP_CP
    INSERT INTO AP_CP (AP_ID, CP_ID)
    VALUES (p_ap_id, p_cp_id);

END$$

DELIMITER ;


/*	ELIMINAR	*/

DELIMITER //

CREATE PROCEDURE AP_CP_Eliminar(
    IN p_cp_id INT,
    IN p_ap_id INT
)
BEGIN
    DELETE FROM AP_CP
    WHERE CP_ID = p_cp_id AND AP_ID = p_ap_id;
END //

DELIMITER ;
