import React from "react";

import "../stylesheets/UserCard.css";

import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";

const ProfesorCard = ({
  nombre,
  apellido,
  ultimoTitulo,
  tipoDocente,
  documento,
  tipoDocumento,
  id,
  handleSelection,
  isSelected,
}) => {
  const handleSelectionCard = () => {
    handleSelection(id);
  };

  return (
    <div
      className={`expandableCard_container selectable ${
        isSelected ? "selected" : ""
      }`.trimEnd()}
      onClick={handleSelectionCard}
    >
      <div className="closed_section_container">
        <UserIcon className="small-icon" />
        <h2>
          {nombre} {apellido}
        </h2>
      </div>
      <div className="closed_section_container">
        <p className="texto-mayor">
          {ultimoTitulo} / {tipoDocente}
        </p>
        <p className="texto-mayor">
          {tipoDocumento} : {documento}
        </p>
        <p className="texto-mayor">#{id}</p>
      </div>
    </div>
  );
};

export default ProfesorCard;
