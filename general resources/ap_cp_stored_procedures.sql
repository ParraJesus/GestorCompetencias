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
