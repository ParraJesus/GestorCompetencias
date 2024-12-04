import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";

import TitleCardNavigation from "../../components/TitleCardNavigation";
import Resultado from "../../components/ResultadoForm";

function App() {
  const navigate = useNavigate();
  const { id, id_asig } = useParams();

  const [competencia, setCompetencia] = useState({
    programa_id: id,
    nombre: "",
    p_ponderacion: "0",
    nivel: "alto",
    p_descripcion: "",
    p_estado: "1",
    resultados: [
      {
        descripcion: "",
        ponderacion: "10",
        rubricas: [
          {
            descripcion: "",
            ponderacion: "10",
          },
        ],
      },
    ],
  });

  const handleFieldChange = (field, value) => {
    setCompetencia({ ...competencia, [field]: value });
  };

  const handleResultadoChange = (index, newResultado) => {
    const newResultados = [...competencia.resultados];
    newResultados[index] = newResultado;
    handleFieldChange("resultados", newResultados);
  };

  const handleAddResultado = () => {
    handleFieldChange("resultados", [
      ...competencia.resultados,
      { descripcion: "", ponderacion: 0, rubricas: [] },
    ]);
  };

  const handleDeleteResultado = (index) => {
    handleFieldChange(
      "resultados",
      competencia.resultados.filter((_, i) => i !== index)
    );
  };

  const validateCompetencia = () => {
    if (
      !competencia.nombre ||
      competencia.p_ponderacion <= 0 ||
      !competencia.p_descripcion
    ) {
      alert("Por favor, completa todos los campos de la competencia.");
      return false;
    }
    for (const resultado of competencia.resultados) {
      if (!resultado.descripcion || resultado.ponderacion <= 0) {
        alert(
          "Por favor, completa todos los campos de los resultados de aprendizaje."
        );
        return false;
      }
      for (const rubrica of resultado.rubricas) {
        if (!rubrica.descripcion || rubrica.ponderacion <= 0) {
          alert("Por favor, completa todos los campos de las rúbricas.");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmitCompetence = async (e) => {
    e.preventDefault();
    if (!validateCompetencia()) return;
    try {
      const response = await axios.post(
        "http:/competenciasprograma/detalles",
        competencia
      );
      alert("Competencia registrada con éxito.");
      navigate(`/coordinador/programas/${id}/${id_asig}`);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar la competencia.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Registrar Competencia"}
          enlace={`/coordinador/programas/${id}/${id_asig}`}
        />
      </div>
      <div className={`${Style.main_content} ${FormStyle.main_container}`}>
        <div className={FormStyle.form_container}>
          <form onSubmit={handleSubmitCompetence} className={FormStyle.form}>
            <div>
              <h2>Competencia de programa</h2>
              <fieldset className={FormStyle.fieldSet}>
                <legend className="texto-mayor">
                  Datos de la competencia del programa
                </legend>
                <input
                  className={`${FormStyle.form_input}`}
                  type="text"
                  placeholder="Nombre"
                  value={competencia.nombre}
                  onChange={(e) => handleFieldChange("nombre", e.target.value)}
                />
                <input
                  className={`${FormStyle.form_input}`}
                  type="number"
                  placeholder="Ponderación"
                  value={competencia.p_ponderacion}
                  onChange={(e) =>
                    handleFieldChange(
                      "p_ponderacion",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
                <select
                  className={`${FormStyle.form_input}`}
                  name="nivel"
                  value={competencia.nivel}
                  onChange={(e) =>
                    handleFieldChange("nivel", e.target.value || "Basico")
                  }
                >
                  <option value="Avanzado">Avanzado</option>
                  <option value="Medio">Medio</option>
                  <option value="Basico">Básico</option>
                </select>
                <textarea
                  className={`${FormStyle.form_input}`}
                  placeholder="Descripción"
                  value={competencia.p_descripcion}
                  onChange={(e) =>
                    handleFieldChange("p_descripcion", e.target.value)
                  }
                />
                <h2>Resultados de Aprendizaje</h2>
                <fieldset className={FormStyle.fieldSet}>
                  <legend className="texto-mayor">
                    Datos de los resultados
                  </legend>
                  {competencia.resultados.map((resultado, index) => (
                    <Resultado
                      key={index}
                      data={resultado}
                      onChange={(newResultado) =>
                        handleResultadoChange(index, newResultado)
                      }
                      onDelete={() => handleDeleteResultado(index)}
                    />
                  ))}
                  <button
                    onClick={handleAddResultado}
                    className={`button-second`}
                  >
                    Añadir Resultado de Aprendizaje
                  </button>
                </fieldset>
              </fieldset>
            </div>
            <button type="submit" className={`button-first`}>
              Guardar Competencia
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
