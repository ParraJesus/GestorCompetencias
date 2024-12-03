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
            <h2>Semestre {semesterData.SEMESTRE}</h2>
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
              <h2>Semestre {semesterData.SEMESTRE}</h2>
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
            {semesterData.ASIGNATURAS.map((asignatura, index) => (
              <AsignatureCard
                key={index}
                id_asig={asignatura.AP_ID}
                nombre={asignatura.AP_NOMBRE}
                descripcion={asignatura.AP_DESCRIPCION}
                creditos={asignatura.AP_CREDITOS}
                horas_semana={asignatura.AP_HORAS_SEMANA}
                modalidad={asignatura.AP_MODALIDAD}
                tipo_materia={asignatura.AP_TIPO_MATERIA}
                estado={asignatura.AP_ESTADO}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SemesterCard;
