import React from "react";
import "../stylesheets/UserCard.css";

const TitleCard = ({ titulo }) => {
  return (
    <div className="expandableCard_container">
      <div className="closed_section_container">
        <h2>{titulo}</h2>
      </div>
      <div className="closed_section_container"></div>
    </div>
  );
};

export default TitleCard;
