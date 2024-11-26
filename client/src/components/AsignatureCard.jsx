import React, { useState } from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const AsignatureCard = ({
  id,
  nombre,
  descripcion,
  creditos,
  semestre,
  horas_semana,
  modalidad,
  tipo_materia,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`expandableCard_container asignature ${
        isExpanded ? "expanded" : ""
      }`.trimEnd()}
    >
      {!isExpanded && (
        <>
          <div className="closed_section_container">
            <h2>{nombre}</h2>
          </div>
          <div className="closed_section_container">
            <p className="texto-mayor">{creditos} créditos</p>
            <p className="texto-mayor">{horas_semana} horas por semana</p>
            <p className="texto-mayor">{modalidad}</p>
            <p className="texto-mayor">#{id}</p>
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
              <h2>{nombre}</h2>
            </div>
            <div className="asignature_headerdata_container">
              <p className="texto-mayor">{creditos} créditos</p>
              <p className="texto-mayor">{horas_semana} horas por semana</p>
              <p className="texto-mayor">{modalidad}</p>
              <p className="texto-mayor">#{id}</p>
              <Chevron
                className="small-icon selectable chevron-icon-up"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="asignature_data_container">
            <p className="paragraph">{descripcion}</p>
          </div>
          <div className="expandableCard_button_container">
            <button>Competencias</button>
            <button>Editar</button>
            <button>Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AsignatureCard;
