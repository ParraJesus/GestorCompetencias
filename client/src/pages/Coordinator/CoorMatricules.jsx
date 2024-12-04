import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

  //Traer información del programa

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

  //Traer información del periodo
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

  //Traer Información de las matrículas
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

  if (programsData.length === 0) {
    return (
      <div className={Style.main}>
        <div className={Style.main_header}>
          <div className="paragraph">Cargando...</div>
        </div>
        <div className={Style.main_content}></div>
      </div>
    );
  }

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
            />
          ))}
        <AddCard
          enlace={`/coordinador/matriculas/${periodo_id}/${programa_id}/registrar`}
          hoverTitle={"Registrar Matrícula"}
        />
      </div>
    </main>
  );
}

export default App;
