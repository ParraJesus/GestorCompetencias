import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";

function EditarAsignatura() {
  const navigate = useNavigate();
  const { id, id_ap } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    creditos: "",
    semestre: "",
    horas_semana: "",
    modalidad: "Presencial",
    tipo_materia: "Teórica",
    estado: "1",
  });

  const [errores, setErrores] = useState({});

  // Cargar datos de la asignatura existente
  useEffect(() => {
    axios
      .get(`http://localhost:5000/asig_plantilla/${id_ap}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          nombre: data.NOMBRE,
          descripcion: data.DESCRIPCION,
          creditos: data.CREDITOS,
          semestre: data.SEMESTRE,
          horas_semana: data.HORAS_SEMANA,
          modalidad: data.MODALIDAD,
          tipo_materia: data.TIPO_MATERIA,
          estado: data.ESTADO.toString(),
        });
      })
      .catch((error) => {
        console.error("Error al cargar los datos de la asignatura:", error);
        alert("Error al cargar los datos de la asignatura.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (data) => {
    const errores = {};
    if (!data.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
    if (isNaN(data.creditos))
      errores.creditos = "Los créditos deben ser un número válido.";
    if (isNaN(data.semestre))
      errores.semestre = "El semestre debe ser un número válido.";
    if (isNaN(data.horas_semana))
      errores.horas_semana = "Las horas por semana deben ser un número válido.";
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
        `http://localhost:5000/asig_plantilla/update/${id_ap}`,
        formData
      );
      alert("Asignatura actualizada exitosamente.");
      navigate(`/coordinador/programas/${id}`);
    } catch (error) {
      console.error("Error al actualizar la asignatura:", error);
      alert("Hubo un error al actualizar la asignatura.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Editar Asignatura"}
          enlace={`/coordinador/programas/${id}`}
        />
      </div>
      <div className={`${Style.main_content} ${FormStyle.main_container}`}>
        <div className={FormStyle.form_container}>
          <form className={`${FormStyle.form}`} onSubmit={handleSubmit}>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Nombre:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese el nombre de la asignatura..."
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              {errores.nombre && (
                <span className="texto-menor text-red">{errores.nombre}</span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Descripción:
              <textarea
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese una descripción..."
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Créditos:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese los créditos..."
                type="text"
                name="creditos"
                value={formData.creditos}
                onChange={handleChange}
                required
              />
              {errores.creditos && (
                <span className="texto-menor text-red">{errores.creditos}</span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Semestre:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese el semestre..."
                type="text"
                name="semestre"
                value={formData.semestre}
                onChange={handleChange}
                required
              />
              {errores.semestre && (
                <span className="texto-menor text-red">{errores.semestre}</span>
              )}
            </label>
            <label className={`${FormStyle.form_label} texto-mayor`}>
              Horas por semana:
              <input
                className={`${FormStyle.form_input}`}
                placeholder="Ingrese las horas por semana..."
                type="text"
                name="horas_semana"
                value={formData.horas_semana}
                onChange={handleChange}
                required
              />
              {errores.horas_semana && (
                <span className="texto-menor text-red">
                  {errores.horas_semana}
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
              Tipo de Materia:
              <select
                className={`${FormStyle.form_input}`}
                name="tipo_materia"
                value={formData.tipo_materia}
                onChange={handleChange}
                required
              >
                <option value="Teórica">Teórica</option>
                <option value="Práctica">Práctica</option>
                <option value="Laboratorio">Laboratorio</option>
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

export default EditarAsignatura;
