import React, { useState } from "react";
import "../stylesheets/UserCard.css";
import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";
/*
<StudentCard
          nombre={"Estudiante"}
          apellido={"Quenguan"}
          documento={"1100000000"}
          tipoDocumento={"CC"}
          id={"001"}
          nombreUsuario={"emorillo"}
          correoInstitucional={"emorillo@unicauca.edu.co"}
          programa={"Ingeniería de Sistemas"}
        />
*/
const StudentCard = ({
  nombre,
  apellido,
  documento,
  tipoDocumento,
  id,
  nombreUsuario,
  correoInstitucional,
  programa,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`expandableCard_container ${
        isExpanded ? "expanded" : ""
      }`.trimEnd()}
    >
      {!isExpanded && (
        <>
          <div className="closed_section_container">
            <UserIcon className="small-icon" />
            <h2>
              {nombre} {apellido}
            </h2>
          </div>
          <div className="closed_section_container">
            <p className="texto-mayor">{correoInstitucional}</p>
            <p className="texto-mayor">
              {tipoDocumento} : {documento}
            </p>
            <p className="texto-mayor">#{id}</p>
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
          <div className="expandableCard_open_data_container">
            <div className="open_section_container">
              <UserIcon className="small-icon" />
              <div className="open_section_data">
                <h2>
                  {nombre} {apellido}
                </h2>
                <p className="texto-mayor">#{id}</p>
                <p className="texto-mayor">Programa: {programa}</p>
                <p className="texto-mayor">
                  {tipoDocumento} : {documento}
                </p>
                <p className="texto-mayor">{nombreUsuario}</p>
                <p className="texto-mayor">{correoInstitucional}</p>
              </div>
            </div>
            <div className="open_section_container">
              <Chevron
                className="small-icon chevron-icon-up selectable"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="expandableCard_button_container">
            <button className="button-second">Editar</button>
            <button className="button-first">Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentCard;
