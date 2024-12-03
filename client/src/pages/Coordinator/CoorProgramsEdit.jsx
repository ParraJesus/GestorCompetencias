import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";

function EditarPrograma() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    coordinador_id: "1",
    nombre: "",
    duracion_semestres: "",
    titulo: "",
    modalidad: "Presencial",
    facultad: "Facultad de Ingeniería Electrónica y Telecomunicaciones",
    tipo_programa: "Pregrado",
    estado: "1",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/programas/programa/${id}`)
      .then((response) => {
        const data = response.data[0];
        setFormData({
          id: data.PROGRAMA_ID,
          coordinador_id: 1,
          nombre: data.NOMBRE,
          duracion_semestres: data.DURACION_SEMESTRES,
          titulo: data.TITULO,
          modalidad: data.MODALIDAD,
          facultad: data.FACULTAD,
          tipo_programa: data.TIPO_PROGRAMA,
          estado: data.ESTADO,
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Error al cargar los datos del programa.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (data) => {
    const errores = {};
    if (!data.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (!data.duracion_semestres || isNaN(data.duracion_semestres)) {
      errores.duracion_semestres = "Debe ser un número válido.";
    }
    if (!data.titulo.trim()) errores.titulo = "El título es obligatorio.";
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresEncontrados = validarFormulario(formData);
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }
    setErrores({});

    try {
      const response = await axios.put(
        `http://localhost:5000/programas`,
        formData
      );
      alert(response.data);
      navigate("/coordinador/programas");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar el programa.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Editar Programa"}
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
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              {errores.nombre && (
                <span className={`${FormStyle.form_error}`}>
                  {errores.nombre}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Duración en Semestres:
              <input
                className={`${FormStyle.form_input}`}
                type="text"
                name="duracion_semestres"
                value={formData.duracion_semestres}
                onChange={handleChange}
                required
              />
              {errores.duracion_semestres && (
                <span className={`${FormStyle.form_error}`}>
                  {errores.duracion_semestres}
                </span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Título:
              <input
                className={`${FormStyle.form_input}`}
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              {errores.titulo && (
                <span className={`${FormStyle.form_error}`}>
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
              Facultad: Facultad:
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
                <option value="Posgrado">Posgrado</option>
              </select>
            </label>
            <button type="submit" className="button-first">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EditarPrograma;
