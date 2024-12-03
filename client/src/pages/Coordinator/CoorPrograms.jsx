import React, { useState, useEffect } from "react";
import axios from "axios";

import ProgramCard from "../../components/ProgramCard";
import SearchBar from "../../components/SearchBar";

import Style from "../../stylesheets/UserPageTemplate.module.css";

function App() {
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
        <SearchBar
          placeholdertext={"Buscar programa..."}
          filters={filtersForPrograms}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={Style.main_content}>
        {programsData.map((programa, index) => (
          <ProgramCard
            key={index}
            id={programa.PROGRAMA_ID}
            nombre={programa.NOMBRE}
            modalidad={programa.MODALIDAD}
            tipoPrograma={programa.TIPO_PROGRAMA}
            facultad={programa.FACULTAD}
            titulo={programa.TITULO}
            cantidadSemestres={programa.DURACION_SEMESTRES}
            estado={programa.ESTADO}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
