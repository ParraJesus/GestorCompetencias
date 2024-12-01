import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Style from "../stylesheets/LoginPage.module.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:5000/login", {
        usuario: username,
        contrasena: password,
      });

      const { token, tipo_usuario } = response.data;

      if (response.data) {
        localStorage.setItem("token", token);
      }

      switch (tipo_usuario) {
        case "coordinador":
          navigate("/coordinador/profesores");
          break;
        case "estudiante":
          navigate("/estudiante/programas");
          break;
        case "profesor":
          navigate("/profesor/periodos");
          break;
        case "evaluador":
          navigate("/evaluador/periodos");
          break;
        default:
          setErrorMessage("Rol desconocido");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Debes llenar los campos... ¡para eso están!");
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Usuario o contraseña incorrectos");
      } else {
        setErrorMessage("Hubo un error en la conexión. Intenta nuevamente.");
      }
      console.error(error);
    }
  };

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="texto-menor text-red">{errorMessage}</p>
          <button className={Style.login_button} onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
