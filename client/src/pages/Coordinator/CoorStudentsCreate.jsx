import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    documento: "",
    tipoDocumento: "CC",
    nombre: "",
    apellido: "",
    usuario: "",
    contrasena: "",
    correo: "",
    estado: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (data) => {
    const errores = {};

    if (!data.documento.trim())
      errores.documento = "El documento es obligatorio.";
    if (!data.tipoDocumento.trim())
      errores.tipoDocumento = "Seleccione un tipo de documento.";
    if (!data.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (!data.apellido.trim()) errores.apellido = "El apellido es obligatorio.";
    if (!data.usuario.trim()) errores.usuario = "El usuario es obligatorio.";
    if (!data.contrasena.trim())
      errores.contrasena = "La contraseña es obligatoria.";
    if (!data.correo.trim()) errores.correo = "El correo es obligatorio.";
    if (!data.estado.trim()) errores.estado = "El estado es obligatorio.";

    if (data.documento && isNaN(data.documento)) {
      errores.documento = "El documento debe contener solo números.";
    }

    if (data.contrasena && data.contrasena.length < 6) {
      errores.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (
      data.correo &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.correo)
    ) {
      errores.correo = "El correo no tiene un formato válido.";
    }

    return errores;
  };

  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresEncontrados = validarFormulario(formData);
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }
    setErrores({});

    try {
      const response = await axios.post("http:/estudiantes/", formData);
      alert(response.data);
      navigate("/coordinador/estudiantes");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar al estudiante.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Registrar Estudiante"}
          enlace={"/coordinador/estudiantes"}
        />
      </div>
      <div className={`${Style.main_content} ${FormStyle.main_container}`}>
        <div className={FormStyle.form_container}>
          <form className={`${FormStyle.form}`} onSubmit={handleSubmit}>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Documento:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese el documento..."
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                required
              />
              {errores.documento && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.documento}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Tipo de Documento:
              <select
                className={`${FormStyle.form_input}`}
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
              {errores.tipoDocumento && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.tipoDocumento}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Nombre:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese el nombre..."
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              {errores.nombre && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.nombre}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Apellido:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese el apellido..."
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              {errores.apellido && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.apellido}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Usuario:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese el usuario..."
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
              {errores.usuario && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.usuario}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Contraseña:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese la contraseña..."
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
              {errores.contrasena && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.contrasena}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Correo:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="ingrese el correo electrónico..."
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              {errores.correo && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.correo}
                </span>
              )}
            </label>
            <button type="submit" className="button-first">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
