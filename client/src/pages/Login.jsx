import React from "react";
import Style from "../stylesheets/LoginPage.module.css";

const App = () => {
  const handleLogin = () => {};

  return (
    <div className={Style.page_container}>
      <div className={Style.image_container}></div>
      <div className={Style.login}>
        <div className={Style.login_container}>
          <h1 className={Style.login_title}>Iniciar Sesión</h1>
          <div className={Style.login_input_container}>
            <label htmlFor="username" className={Style.login_label}>
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type={"text"}
              placeholder="Ingresar nombre de usuario"
              className={Style.login_input}
            />
          </div>
          <div className={Style.login_input_container}>
            <label htmlFor="password" className={Style.login_label}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={"password"}
              placeholder="Ingresar contraseña"
              className={Style.login_input}
            />
          </div>
          <button className={Style.login_button} onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
