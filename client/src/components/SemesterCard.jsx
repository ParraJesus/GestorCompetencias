import React, { useState } from "react";
import AsignatureCard from "../components/AsignatureCard.jsx";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const SemesterCard = ({ semesterData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`expandableCard_container semester ${
        isExpanded ? "expanded" : ""
      }`.trimEnd()}
    >
      {!isExpanded && (
        <>
          <div className="closed_section_container">
            <h2>Semestre {semesterData.semestre}</h2>
          </div>
          <div className="closed_section_container">
            <Chevron
              className="small-icon selectable"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          </div>
        </>
      )}
      {isExpanded && (
        <>
          <div className="asignature_data_container">
            <div className="asignature_headerdata_container">
              <h2>Semestre {semesterData.semestre}</h2>
            </div>
            <div className="asignature_headerdata_container">
              <Chevron
                className="small-icon selectable chevron-icon-up"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="semester_data_container">
            {semesterData.asignaturas.map((asignatura) => (
              <AsignatureCard key={asignatura.id} {...asignatura} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SemesterCard;
