import React from "react";
import "../stylesheets/UserCard.css";

import { useNavigate } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../assets/bx-plus.svg";

const AddCard = ({ hoverTitle, enlace, height }) => {
  const navigate = useNavigate();
  const handleClic = () => {
    navigate(enlace);
  };
  return (
    <div
      className="expandableCard_container periodCard_text_container addCard"
      onClick={handleClic}
      title={hoverTitle}
    >
      <PlusIcon className="small-icon" />
    </div>
  );
};

export default AddCard;
