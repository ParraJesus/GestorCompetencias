import React, { useState } from "react";
import "../stylesheets/ProfesorCard.css";
import { ReactComponent as UserIcon } from "../assets/bxs-user-circle.svg";
import { ReactComponent as Chevron } from "../assets/bx-chevron-down.svg";

const ProfesorCard = ({
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
      className={`contenedor_tarjeta_profesor ${
        isExpanded ? "expanded" : ""
      }`.trimEnd()}
    >
      {!isExpanded && (
        <>
          <div className="mini_contenedor_tarjeta_profesor">
            <UserIcon className="small-icon" />
            <h2>
              {nombre} {apellido}
            </h2>
          </div>
          <div className="mini_contenedor_tarjeta_profesor">
            <p className="texto-mayor">
              {ultimoTitulo} / {tipoDocente}
            </p>
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
          <div className="tarjeta_profesor_datos_container">
            <div className="tarjeta_profesor_datos-expandido">
              <UserIcon className="small-icon" />
              <div className="tarjeta_profesor_datos-vertical">
                <h2>
                  {nombre} {apellido}
                </h2>
                <p className="texto-mayor">#{id}</p>
                <p className="texto-mayor">
                  {ultimoTitulo} / {tipoDocente}
                </p>
                <p className="texto-mayor">
                  {tipoDocumento} : {documento}
                </p>
                <p className="texto-mayor">{nombreUsuario}</p>
                <p className="texto-mayor">{correoInstitucional}</p>
              </div>
            </div>

            <div className="tarjeta_profesor_datos-expandido">
              <Chevron
                className="small-icon chevron-icon-up selectable"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              />
            </div>
          </div>
          <div className="tarjeta_profesor_boton_container">
            <button>Editar</button>
            <button>Deshabilitar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfesorCard;
