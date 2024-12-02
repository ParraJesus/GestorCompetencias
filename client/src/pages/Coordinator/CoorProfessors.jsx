import React, { useState, useEffect } from "react";
import axios from "axios";

import Style from "../../stylesheets/UserPageTemplate.module.css";

import ProfessorCard from "../../components/ProfessorCard";
import SearchBar from "../../components/SearchBar";

function App() {
  const [currentFilter, setCurrentFilter] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForProfessors = [
    { label: "Todos", value: "none" },
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
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profesores");

        setProfessorsData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, []);

  if (professorsData.length === 0) {
    return (
      <div className={Style.main}>
        <div className={Style.main_header}>
          <div className="paragraph">
            Si puedes leer esto, revisa tu conexión...
          </div>
        </div>
        <div className={Style.main_content}></div>
      </div>
    );
  }

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
