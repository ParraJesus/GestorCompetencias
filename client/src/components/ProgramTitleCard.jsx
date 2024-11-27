import React from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

/*
<ProgramCard
  nombre={"Ingeniería de Sistemas"}
  id={"001"}
  modalidad={"Presencial"}
  tipoPrograma={"Pregrado"}
  facultad={"Ingeniería Electrónica y Telecomunicaciones"}
/>
*/

const ProgramTitleCard = ({
  id,
  nombre,
  modalidad,
  tipoPrograma,
  facultad,
  enlace,
}) => {
  return (
    <div className="expandableCard_container">
      <div className="closed_section_container">
        <a href={enlace}>
          <Chevron className="small-icon selectable chevron-icon-left" />
        </a>
        <h2>
          {nombre} - {modalidad}
        </h2>
      </div>
      <div className="closed_section_container">
        <p className="texto-mayor">{tipoPrograma}</p>
        <p className="texto-mayor">{facultad}</p>
        <p className="texto-mayor">#{id}</p>
      </div>
    </div>
  );
};

export default ProgramTitleCard;
