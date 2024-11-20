import React, { useState } from "react";
import "../stylesheets/ProfesorCard.css";
import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

export const ProfesorCardClosed = ({
  nombre,
  apellido,
  ultimoTitulo,
  tipoDocente,
  documento,
  tipoDocumento,
  id,
  nombreUsuario,
  correoInstitucional,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`contenedor_tarjeta ${isExpanded ? "expanded" : ""}`.trimEnd()}
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      {!isExpanded && (
        <>
          <UserIcon className="small-icon" />
          <h2>
            {nombre} {apellido}
          </h2>
          <p className="texto-mayor">
            {ultimoTitulo} / {tipoDocente}
          </p>
          <p className="texto-mayor">
            {tipoDocumento}:{documento}
          </p>
          <p className="texto-mayor">#{id}</p>
          <Chevron className="small-icon" />
        </>
      )}
      {isExpanded && (
        <>
          <p className="texto-mayor">{nombreUsuario}</p>
          <p className="texto-mayor">{correoInstitucional}</p>
          <Chevron className="small-icon chevron-icon-up" />
        </>
      )}
    </div>
  );
};

export const ProfesorCardOpen = () => {
  return (
    <React.Fragment>
      <h1>hola,mundo</h1>
    </React.Fragment>
  );
};
