import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import ProgramMatriculeCard from "../../components/ProgramMatriculeCard";
import SearchBar from "../../components/SearchBar";
import PeriodTitleCard from "../../components/PeriodTitleCard";

import Style from "../../stylesheets/UserPageTemplate.module.css";

function App() {
  const navigate = useNavigate();

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

  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/programas");
        setProgramsData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, []);

  const { periodo_id } = useParams();
  const [isLoadingPeriod, setIsLoadingPeriod] = useState(true);
  const [perdiodData, setPeriodData] = useState([]);

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

  const handleCreateMatricule = (program_id) => {
    navigate(`/coordinador/matriculas/${periodo_id}/${program_id}`);
  };

  const handleCreateInform = () => {
    console.log("informe creado");
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        {!isLoadingPeriod && (
          <PeriodTitleCard
            enlace={"/coordinador/matriculas"}
            id={perdiodData.PERIODO_ID}
            ano={perdiodData.ANO}
            ciclo={perdiodData.CICLO}
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
        {programsData.map((programa, index) => (
          <ProgramMatriculeCard
            key={index}
            id={programa.PROGRAMA_ID}
            nombre={programa.NOMBRE}
            modalidad={programa.MODALIDAD}
            tipoPrograma={programa.TIPO_PROGRAMA}
            facultad={programa.FACULTAD}
            titulo={programa.TITULO}
            cantidadSemestres={programa.DURACION_SEMESTRES}
            handleMatricule={handleCreateMatricule}
            handleInform={handleCreateInform}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
