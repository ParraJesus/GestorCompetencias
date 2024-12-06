import React from "react";

import "../stylesheets/UserCard.css";

const ProgramCard = ({
  id,
  nombre,
  modalidad,
  tipoPrograma,
  facultad,
  titulo,
  cantidadSemestres,
  handleMatricule,
  handleInform,
}) => {
  return (
    <div className={`expandableCard_container expanded programCard`}>
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
      </div>
      <div className="expandableCard_button_container">
        <button
          className="button-first"
          onClick={() => {
            handleMatricule(id);
          }}
        >
          Gestionar Matrículas
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
