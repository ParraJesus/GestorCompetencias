import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";

function CrearPrograma() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coordinador_id: "1",
    nombre: "",
    duracion_semestres: "10",
    titulo: "",
    modalidad: "Presencial",
    facultad: "Facultad de Ingeniería Eletrónica y Telecomunicaciones",
    tipo_programa: "Pregrado",
    estado: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (data) => {
    const errores = {};

    if (!data.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (!data.duracion_semestres.trim())
      errores.duracion_semestres = "La duración en semestres es obligatoria.";
    if (isNaN(data.duracion_semestres) || parseInt(data.duracionSemestres) <= 0)
      errores.duracion_semestres = "La duración debe ser un número mayor a 0.";
    if (!data.titulo.trim()) errores.titulo = "El título es obligatorio.";

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
      const response = await axios.post(
        "http://localhost:5000/programas/create",
        formData
      );
      alert(response.data);
      navigate("/coordinador/programas");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el programa.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Registrar Programa"}
          enlace={"/coordinador/programas"}
        />
      </div>
      <div className={`${Style.main_content} ${FormStyle.main_container}`}>
        <div className={FormStyle.form_container}>
          <form className={`${FormStyle.form}`} onSubmit={handleSubmit}>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Nombre:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese el nombre del programa..."
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
              Duración en Semestres:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese la duración..."
                type="text"
                name="duracionSemestres"
                value={formData.duracion_semestres}
                onChange={handleChange}
                required
              />
              {errores.duracionSemestres && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.duracionSemestres}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Título:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese el título del programa..."
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              {errores.titulo && (
                <span
                  className={`${FormStyle.form_label} texto-menor text-red`}
                >
                  {errores.titulo}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Modalidad:
              <select
                className={`${FormStyle.form_input}`}
                name="modalidad"
                value={formData.modalidad}
                onChange={handleChange}
                required
              >
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Mixta">Mixta</option>
              </select>
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Facultad:
              <select
                className={`${FormStyle.form_input}`}
                name="facultad"
                value={formData.facultad}
                onChange={handleChange}
                required
              >
                <option value="Ingeniería Electronica y Telecomunicaciones">
                  Ingeniería Electrónica y Telecomunicaciones
                </option>
                <option value="Ingeniería Civil">Ingeniería Civil</option>
                <option value="Humanidades">Humanidades</option>
              </select>
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Tipo de Programa:
              <select
                className={`${FormStyle.form_input}`}
                name="tipo_programa"
                value={formData.tipo_programa}
                onChange={handleChange}
                required
              >
                <option value="Pregrado">Pregrado</option>
                <option value="Maestría">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
            </label>
            <button type="submit" className="button-first">
              Registrar Programa
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CrearPrograma;
