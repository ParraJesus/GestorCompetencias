import React from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const AsignatureTitleCard = ({ id, nombre, enlace }) => {
  return (
    <div className="expandableCard_container">
      <div className="closed_section_container">
        <a href={enlace}>
          <Chevron className="small-icon selectable chevron-icon-left" />
        </a>
        <h2>{nombre} / Competencias</h2>
      </div>
      <div className="closed_section_container">
        <p className="texto-mayor">#{id}</p>
      </div>
    </div>
  );
};

export default AsignatureTitleCard;
