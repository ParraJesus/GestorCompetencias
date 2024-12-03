import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../stylesheets/UserCard.css";

import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const ProgramCard = ({
  id,
  nombre,
  modalidad,
  tipoPrograma,
  facultad,
  titulo,
  cantidadSemestres,
  estado,
  onUpdateState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const handlePlanDeEstudios = () => {
    navigate(`/coordinador/programas/${id}`);
  };

  const handleEditar = () => {
    navigate(`/coordinador/programas/editar/${id}`);
  };

  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que deseas deshabilitar este programa?")
    ) {
      axios
        .delete(`http://localhost:5000/programas/${id}`)
        .then((response) => {
          alert(response.data);
          onUpdateState(id, "0");
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar el programa.");
        });
    }
  };

  const hadleHabilitar = () => {
    if (
      window.confirm("¿Estás seguro de que deseas habilitar este programa?")
    ) {
      axios
        .put(`http://localhost:5000/programas/habilitar/${id}`)
        .then((response) => {
          alert(response.data);
          onUpdateState(id, "1");
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar el programa.");
        });
    }
  };

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
              {nombre} - {modalidad}
            </h2>
          </div>
          <div className="closed_section_container">
            <p className="texto-mayor">{tipoPrograma}</p>
            <p className="texto-mayor">{facultad}</p>
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
          <div className="expandableCard_open_data_container">
            <div className="open_section_container">
              <div className="open_section_data">
                <h2>
                  {nombre} - {modalidad}
                </h2>
                <p className="texto-mayor">#{id}</p>
                <p className="texto-mayor">{tipoPrograma}</p>
                <p className="texto-mayor">{facultad}</p>
                <p className="texto-mayor">Título en {titulo}</p>
                <p className="texto-mayor">{cantidadSemestres} semestres</p>
              </div>
            </div>
            <div className="open_section_container">
              <Chevron
                className="small-icon chevron-icon-up selectable"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="expandableCard_button_container">
            <button className="button-second" onClick={handlePlanDeEstudios}>
              Plan de estudios
            </button>
            <button className="button-second" onClick={handleEditar}>
              Editar
            </button>
            {estado === "0" && (
              <button className="button-first" onClick={hadleHabilitar}>
                Habilitar
              </button>
            )}
            {estado === "1" && (
              <button className="button-first" onClick={handleDelete}>
                Deshabilitar
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgramCard;
