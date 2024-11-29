import React, { useState, useEffect } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import ProfessorCard from "../components/ProfessorCard";
import SearchBar from "../components/SearchBar";

function App() {
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForProfessors = [
    { label: "Nombre", value: "nombre" },
    { label: "Apellido", value: "apellido" },
    { label: "ID", value: "id" },
    { label: "Número de documento", value: "documento" },
    { label: "Cargo", value: "tipoDocente" },
    { label: "Título académico", value: "ultimoTitulo" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const [professorsData, setProfessorsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/profesores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los profesores");
        }
        return response.json();
      })
      .then((data) => {
        setProfessorsData(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  }, []);

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <SearchBar
          placeholdertext={"Buscar profesor..."}
          filters={filtersForProfessors}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={Style.main_content}>
        {professorsData.map((professor, index) => (
          <ProfessorCard
            key={index}
            id={professor.PROF_ID}
            nombre={professor.NOMBRE}
            apellido={professor.APELLIDO}
            documento={professor.DOCUMENTO}
            tipoDocumento={professor.TIPO_DOCUMENTO}
            tipoDocente={professor.TIPO_DOCENTE}
            ultimoTitulo={professor.ULTIMO_TITULO}
            nombreUsuario={professor.USUARIO}
            correoInstitucional={professor.CORREO_INSTITUCIONAL}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
