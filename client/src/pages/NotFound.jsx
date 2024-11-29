import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "../stylesheets/NotFound.module.css";

const App = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <div className={Style.page_Container}>
      <div className={Style.content_container}>
        <h1 className={Style.notFound_title}>404</h1>
        <p className={Style.notFound_text}>¡Oh, qué vacío!</p>
        <button className={Style.notFound_button} onClick={handleRedirect}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default App;
