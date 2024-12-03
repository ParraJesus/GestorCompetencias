import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  estado,
  onUpdateState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const hadleCompetencias = () => {
    navigate(`/coordinador/programas/${id}/${id_asig}`);
  };

  const handleEditar = () => {
    navigate(`/coordinador/programas/${id}/editar/${id_asig}`);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas deshabilitar esta asignatura?"
      )
    ) {
      axios
        .delete(`http://localhost:5000/asig_plantilla/${id_asig}`)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar la asignatura.");
        });
    }
  };
  const hadleHabilitar = () => {
    if (
      window.confirm("¿Estás seguro de que deseas habilitar esta asignatura?")
    ) {
      axios
        .put(`http://localhost:5000/asig_plantilla/habilitar/${id_asig}`)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar el evaluador.");
        });
    }
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

export default AsignatureCard;
