import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../stylesheets/UserCard.css";

import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const EvaluadorCard = ({
  nombre,
  apellido,
  documento,
  tipoDocumento,
  id,
  nombreUsuario,
  correoInstitucional,
  estado,
  onUpdateState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const handleEditar = () => {
    navigate(`/coordinador/evaluadores/editar/${id}`);
  };

  const handleDelete = () => {
    if (
      window.confirm("¿Estás seguro de que deseas deshabilitar este evaluador?")
    ) {
      axios
        .delete(`http://localhost:5000/evaluadores/${id}`)
        .then((response) => {
          alert(response.data);
          onUpdateState(id, "0");
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar el evaluador.");
        });
    }
  };
  const hadleHabilitar = () => {
    if (
      window.confirm("¿Estás seguro de que deseas habilitar este evaluador?")
    ) {
      axios
        .put(`http://localhost:5000/evaluadores/habilitar/${id}`)
        .then((response) => {
          alert(response.data);
          onUpdateState(id, "1");
        })
        .catch((error) => {
          console.error(error);
          alert("Error al deshabilitar el evaluador.");
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
            <UserIcon className="small-icon" />
            <h2>
              {nombre} {apellido}
            </h2>
          </div>
          <div className="closed_section_container">
            <p className="texto-mayor">{correoInstitucional}</p>
            <p className="texto-mayor">
              {tipoDocumento} : {documento}
            </p>
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
              <UserIcon className="small-icon" />
              <div className="open_section_data">
                <h2>
                  {nombre} {apellido}
                </h2>
                <p className="texto-mayor">#{id}</p>
                <p className="texto-mayor">
                  {tipoDocumento} : {documento}
                </p>
                <p className="texto-mayor">{nombreUsuario}</p>
                <p className="texto-mayor">{correoInstitucional}</p>
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

export default EvaluadorCard;
