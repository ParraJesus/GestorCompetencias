import React from "react";
import "../stylesheets/UserCard.css";

import { useNavigate } from "react-router-dom";

const AsignatureTitleCard = ({ periodo_id, ano, ciclo, enlace }) => {
  const navigate = useNavigate();
  const handleClic = () => {
    navigate(`/coordinador/matriculas/${periodo_id}`);
  };
  return (
    <div
      className="expandableCard_container periodCard_text_container"
      onClick={handleClic}
    >
      <h2>
        {ano} - {ciclo}
      </h2>
    </div>
  );
};

export default AsignatureTitleCard;
