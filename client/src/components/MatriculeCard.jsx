import React from "react";

import "../stylesheets/UserCard.css";

const MatriculeCard = ({
  id,
  nombreAsignatura,
  grupoAsignatura,
  profesorID,
  profesorNombre,
  profesorApellido,
  evaluadorID,
  evaluadorNombre,
  evaluadorApellido,
  cantidadEstudiantes,
}) => {
  return (
    <div className={`expandableCard_container expanded programCard`}>
      <div className="expandableCard_open_data_container">
        <div className="open_section_container">
          <div className="open_section_data">
            <h2>
              {nombreAsignatura} - Grupo: {grupoAsignatura}
            </h2>
            <p className="texto-mayor">#{id}</p>
            <p className="texto-mayor">
              Profesor: {profesorNombre} {profesorApellido}{" "}
              <strong>#{profesorID}</strong>
            </p>
            <p className="texto-mayor">
              Evaluador: {evaluadorNombre} {evaluadorApellido}{" "}
              <strong>#{evaluadorID}</strong>
            </p>
            <p className="texto-mayor">
              Cantidad de estudiantes: {cantidadEstudiantes}
            </p>
          </div>
        </div>
      </div>
      <div className="expandableCard_button_container">
        <button className="button-second">Editar</button>
        <button className="button-first" onClick={() => {}}>
          Generar Informe
        </button>
      </div>
    </div>
  );
};

export default MatriculeCard;
