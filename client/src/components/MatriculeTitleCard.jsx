import React from "react";
import "../stylesheets/UserCard.css";

import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";
import { Link } from "react-router-dom";

const MatriculeTitleCard = ({ programa, periodo, enlace }) => {
  return (
    <div className="expandableCard_container">
      <div className="closed_section_container">
        <Link to={enlace}>
          <Chevron className="small-icon selectable chevron-icon-left" />
        </Link>
        <h2>
          {programa} // {periodo}
        </h2>
      </div>
      <div className="closed_section_container"></div>
    </div>
  );
};

export default MatriculeTitleCard;
