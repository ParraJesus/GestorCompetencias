import React, { useState } from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const CompetenceCard = ({ competenceData, onClick, buttonText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`expandableCard_container ${
        isExpanded ? "expanded" : ""
      }`.trimEnd()}
    >
      {!isExpanded && (
        <>
          <div className="closed_section_container">
            <h2>
              #{competenceData.CP_ID} {competenceData.NOMBRE}{" "}
              {competenceData.ponderacion}
            </h2>
          </div>
          <div className="closed_section_container">
            <Chevron
              className="small-icon selectable"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          </div>
        </>
      )}
      {isExpanded && (
        <>
          <div className="asignature_data_container">
            <div className="asignature_headerdata_container">
              <h2>
                #{competenceData.CP_ID} {competenceData.NOMBRE}
              </h2>
            </div>
            <div className="asignature_headerdata_container">
              <Chevron
                className="small-icon selectable chevron-icon-up"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="competence_data_container">
            <p className="paragraph">{competenceData.DESCRIPCION}</p>
            <p className="paragraph">
              <strong>Nivel:</strong> {competenceData.NIVEL}
            </p>
            <ul className="paragraph">
              {competenceData.RESULTADOS_APRENDIZAJE.map((ra, index) => (
                <li key={index} className="paragraph">
                  <strong>
                    Resultado de aprendiza de programa {ra.RAP_ID} (
                    {ra.PONDERACION}%):
                  </strong>{" "}
                  {ra.DESCRIPCION}
                  <ul>
                    {ra.RUBRICAS_EVALUACION.map((ru, index) => (
                      <li key={index} className="paragraph">
                        <strong>
                          Rúbrica de evaluación {ru.RUP_ID} ({ru.PONDERACION}%):
                        </strong>{" "}
                        {ru.DESCRIPCION}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="expandableCard_button_container">
            <button className="button-second" onClick={onClick}>
              {buttonText}
            </button>
            <button className="button-second">Editar</button>
            <button className="button-first">Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetenceCard;
