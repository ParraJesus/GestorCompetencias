import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import MatriculeCard from "../../components/MatriculeCard";
import SearchBar from "../../components/SearchBar";
import MatriculeTitleCard from "../../components/MatriculeTitleCard";
import AddCard from "../../components/AddCard";

import Style from "../../stylesheets/UserPageTemplate.module.css";

function App() {
  const navigate = useNavigate();
  const { periodo_id, programa_id } = useParams();

  const [currentFilter, setCurrentFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForPrograms = [
    { label: "Todos", value: "none" },
    { label: "Nombre", value: "nombre" },
    { label: "Tipo de programa", value: "type" },
    { label: "Facultad", value: "facultad" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Traer información del programa
  const [programsData, setProgramsData] = useState([]);
  const [isLoadingProgram, setIsLoadingProgram] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingProgram(true);
        const response = await axios.get(
          `http://localhost:5000/programas/programa/${programa_id}`
        );
        setProgramsData(response.data[0]);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingProgram(false);
      }
    };
    fetchItems();
  }, []);

  // Traer información del periodo
  const [perdiodData, setPeriodData] = useState([]);
  const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingPeriod(true);
        const response = await axios.get(
          `http://localhost:5000/periodos/${periodo_id}`
        );
        setPeriodData(response.data[0]);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingPeriod(false);
      }
    };
    fetchItems();
  }, [periodo_id]);

  // Traer Información de las matrículas
  const [matriculesData, setMatriculesData] = useState([]);
  const [isLoadingMatricules, setIsLoadingMatricules] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingMatricules(true);
        const response = await axios.get(
          `http://localhost:5000/matriculas/detalles_as/${periodo_id}/${programa_id}`
        );
        setMatriculesData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingMatricules(false);
      }
    };
    fetchItems();
  }, [periodo_id]);

  const [informData, setInformData] = useState([]);
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Informe",
  });

  const generateInform = (idPeriodoMatricula) => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/matriculas/informeasignatura/${idPeriodoMatricula}`
        );
        setInformData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  };

  // Usamos useEffect para imprimir una vez que informData haya cambiado
  useEffect(() => {
    if (informData.length > 0) {
      handlePrint(); // Generamos el informe cuando los datos estén listos
    }
  }, [informData]);

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        {!isLoadingProgram && !isLoadingPeriod && (
          <MatriculeTitleCard
            enlace={`/coordinador/matriculas/${periodo_id}`}
            programa={`${programsData.NOMBRE} - ${programsData.MODALIDAD}`}
            periodo={`${perdiodData.ANO} - ${perdiodData.CICLO}`}
          />
        )}
        <SearchBar
          placeholdertext={"Buscar programa..."}
          filters={filtersForPrograms}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={`${Style.main_content} ${Style.main_grid_two_rows}`}>
        {!isLoadingMatricules &&
          matriculesData.map((matricula, index) => (
            <MatriculeCard
              key={index}
              id={matricula.ID_Asignatura}
              nombreAsignatura={matricula.NombreAsignatura}
              grupoAsignatura={matricula.Grupo}
              profesorNombre={matricula.NombreProfesor}
              profesorApellido={matricula.ApellidoProfesor}
              profesorID={matricula.ID_Profesor}
              evaluadorNombre={matricula.NombreEvaluador}
              evaluadorApellido={matricula.ApellidoEvaluador}
              evaluadorID={matricula.ID_Evaluador}
              cantidadEstudiantes={matricula.CantidadEstudiantes}
              id_pmat={matricula.ID_PeriodoMatricula}
              handleGenerateInform={() =>
                generateInform(matricula.ID_PeriodoMatricula)
              }
            />
          ))}
        <AddCard
          enlace={`/coordinador/matriculas/${periodo_id}/${programa_id}/registrar`}
          hoverTitle={"Registrar Matrícula"}
        />
      </div>

      <div id="reporte" style={{}} ref={reportRef}>
        <div>
          <h1>Informe Generado</h1>

          {informData.length > 0 &&
            informData.map((inform, index) => (
              <div key={index}>
                <h2>{`Materia: ${inform.Nombre_Materia} (${inform.Grupo})`}</h2>
                <p>
                  <strong>Profesor:</strong> {inform.Nombre_Profesor}{" "}
                  {inform.Apellido_Profesor} ({inform.Titulo_Profesor})
                </p>
                <p>
                  <strong>Correo del Profesor:</strong> {inform.Correo_Profesor}
                </p>
                <p>
                  <strong>Evaluador:</strong> {inform.Nombre_Evaluador}{" "}
                  {inform.Apellido_Evaluador}
                </p>
                <p>
                  <strong>Correo del Evaluador:</strong>{" "}
                  {inform.Correo_Evaluador}
                </p>

                <h3>Competencias</h3>
                {inform.Competencias &&
                  inform.Competencias.map((competencia, idx) => (
                    <div key={idx}>
                      <h4>{competencia.Competencia}</h4>
                      <p>
                        <strong>Resultados de Aprendizaje:</strong>
                      </p>
                      <ul>
                        {competencia.ResultadosAprendizaje.map(
                          (resultado, rIdx) => (
                            <li
                              key={rIdx}
                            >{`${resultado.RAANombre} (Ponderación: ${resultado.RAAPonderacion}%)`}</li>
                          )
                        )}
                      </ul>
                      <p>
                        <strong>Rubricas:</strong>
                      </p>
                      <ul>
                        {competencia.Rubricas.map((rubrica, rIdx) => (
                          <li
                            key={rIdx}
                          >{`${rubrica.RUANombre} (Ponderación: ${rubrica.RUAPonderacion}%)`}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {/* Aquí añadimos la sección de Evaluaciones */}
                <h3>Evaluaciones</h3>
                {inform.Evaluaciones ? (
                  <ul>
                    {inform.Evaluaciones.map((evaluacion, evalIdx) => (
                      <li key={evalIdx}>
                        <strong>{evaluacion.NombreEvaluacion}</strong>:{" "}
                        {evaluacion.DescripcionEvaluacion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay evaluaciones disponibles.</p>
                )}

                <h3>Estudiantes</h3>
                {inform.Estudiantes &&
                  inform.Estudiantes.map((estudiante, estIdx) => (
                    <p key={estIdx}>
                      {estudiante.Nombre} {estudiante.Apellido}
                    </p>
                  ))}
              </div>
            ))}
        </div>
        <button onClick={handlePrint}>Imprimir Informe</button>
      </div>
    </main>
  );
}

export default App;
