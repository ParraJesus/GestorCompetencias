import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../stylesheets/UserCard.css";

import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const AsignatureCard = ({
  id_asig,
  nombre,
  descripcion,
  creditos,
  horas_semana,
  modalidad,
  tipo_materia,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const hadleCompetencias = () => {
    navigate(`/coordinador/programas/${id}/${id_asig}`);
  };

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
            <p className="texto-mayor">#{id_asig}</p>
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
              <p className="texto-mayor">#{id_asig}</p>
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
            <button className="button-second" onClick={hadleCompetencias}>
              Competencias
            </button>
            <button className="button-second">Editar</button>
            <button className="button-first">Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AsignatureCard;
