import React, { useState } from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const CompetenceCard = ({ competenceData }) => {
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
              #{competenceData.id} {competenceData.nombre}{" "}
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
                #{competenceData.id} {competenceData.nombre}{" "}
                {competenceData.ponderacion}
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
            <p className="paragraph">{competenceData.descripcion}</p>
            <p className="paragraph">
              <strong>Nivel:</strong> {competenceData.nivel}
            </p>
            <ul className="paragraph">
              {competenceData.RA.map((ra) => (
                <li key={ra.id}>
                  <strong>
                    Datos RA {ra.id} {ra.ponderacion}:
                  </strong>{" "}
                  {ra.descripcion}
                  <ul>
                    {ra.RU.map((ru) => (
                      <li key={ru.id}>
                        <strong>Datos RU {ru.id}:</strong> {ru.descripcion} -{" "}
                        <em>Ponderación:</em> {ru.ponderacion}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="expandableCard_button_container">
            <button className="button-second"> Agregar</button>
            <button className="button-second">Editar</button>
            <button className="button-first">Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompetenceCard;
