import React from "react";
import "../stylesheets/UserCard.css";

import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";
import { Link } from "react-router-dom";

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
        <Link to={enlace}>
          <Chevron className="small-icon selectable chevron-icon-left" />
        </Link>
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
