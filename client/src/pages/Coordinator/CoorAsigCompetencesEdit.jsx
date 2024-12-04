import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import FormStyle from "../../stylesheets/Form.module.css";

import TitleCardNavigation from "../../components/TitleCardNavigation";
import Resultado from "../../components/ResultadoForm";

function App() {
  const navigate = useNavigate();
  const { id, id_asig, id_cp } = useParams();

  const [competencia, setCompetencia] = useState({
    programa_id: id,
    cp_id: "",
    nombre: "",
    p_descripcion: "",
    nivel: "alto",
    p_ponderacion: "0",
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

  //Traer los datos de la competencia
  useEffect(() => {
    const fetchCompetence = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/competenciasprograma/competencia/${id_cp}`
        );
        const data =
          typeof response.data.CompetenciaJSON === "string"
            ? JSON.parse(response.data.CompetenciaJSON) // Si es un string, lo parseamos
            : response.data.CompetenciaJSON;

        // Mapeo los resultados de aprendizaje para incluir las rúbricas
        const resultadosConRubricas = data.RESULTADOS_APRENDIZAJE.map(
          (resultado) => ({
            rap_id: resultado.RAP_ID,
            descripcion: resultado.DESCRIPCION,
            ponderacion: resultado.PONDERACION,
            rubricas: resultado.RUBRICAS_EVALUACION.map((rubrica) => ({
              rup_id: rubrica.RUP_ID,
              descripcion: rubrica.DESCRIPCION,
              ponderacion: rubrica.PONDERACION,
            })),
          })
        );

        setCompetencia({
          cp_id: data.CP_ID,
          nivel: data.NIVEL,
          p_estado: data.ESTADO,
          nombre: data.NOMBRE,
          p_descripcion: data.DESCRIPCION,
          p_ponderacion: data.PONDERACION,
          programa_id: data.PROGRAMA_ID,
          resultados: resultadosConRubricas,
        });
      } catch (error) {
        console.error("Error al obtener la competencia:", error);
        alert("No se pudo cargar la competencia para editar.");
      }
    };
    fetchCompetence();
  }, [id_cp]);

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

  const handleEditCompetence = async (e) => {
    e.preventDefault();
    if (!validateCompetencia()) return;

    const competenciaData = {
      competencia: {
        programa_id: competencia.programa_id,
        nombre: competencia.nombre,
        p_descripcion: competencia.p_descripcion,
        nivel: competencia.nivel,
        p_ponderacion: competencia.p_ponderacion,
        p_estado: competencia.p_estado,
      },
      resultados: competencia.resultados.map((resultado) => ({
        rap_id: resultado.rap_id,
        descripcion: resultado.descripcion,
        ponderacion: resultado.ponderacion,
        rubricas: resultado.rubricas.map((rubrica) => ({
          rup_id: rubrica.rup_id,
          descripcion: rubrica.descripcion,
          ponderacion: rubrica.ponderacion,
        })),
      })),
    };

    try {
      await axios.post(
        `/competenciasprograma/detalles/${id_cp}`,
        competenciaData
      );
      alert("Competencia actualizada con éxito.");
      navigate(`/coordinador/programas/${id}/${id_asig}`);
    } catch (error) {
      console.error("Error al actualizar la competencia:", error);
      alert("Hubo un error al actualizar la competencia.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Editar Competencia"}
          enlace={`/coordinador/programas/${id}/${id_asig}`}
        />
      </div>
      <div className={`${Style.main_content} ${FormStyle.main_container}`}>
        <div className={FormStyle.form_container}>
          <form onSubmit={handleEditCompetence} className={FormStyle.form}>
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
