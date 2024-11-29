import React, { useState, useEffect } from "react";

import ProgramCard from "../components/ProgramCard";
import SearchBar from "../components/SearchBar";

import Style from "../stylesheets/UserPageTemplate.module.css";

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
    fetch("http://localhost:5000/programas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los programas");
        }
        return response.json();
      })
      .then((data) => {
        setProgramsData(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  }, []);

  if (programsData.length === 0) {
    return <div>Cargando...</div>;
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
          />
        ))}
      </div>
    </main>
  );
}

export default App;
