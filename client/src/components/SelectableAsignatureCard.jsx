import React from "react";

import "../stylesheets/UserCard.css";

const AsignatureCard = ({
  id_asig,
  nombre,
  creditos,
  horas_semana,
  modalidad,
  handleSelection,
  isSelected,
}) => {
  const handleSelectionCard = () => {
    handleSelection(id_asig);
  };

  return (
    <div
      className={`expandableCard_container selectable ${
        isSelected ? "selected" : ""
      }`.trimEnd()}
      onClick={handleSelectionCard}
    >
      <div className="closed_section_container">
        <h2>{nombre}</h2>
      </div>
      <div className="closed_section_container">
        <p className="texto-mayor">{creditos} créditos</p>
        <p className="texto-mayor">{horas_semana} horas por semana</p>
        <p className="texto-mayor">{modalidad}</p>
        <p className="texto-mayor">#{id_asig}</p>
      </div>
    </div>
  );
};

export default AsignatureCard;
