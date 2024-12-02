import React, { useState, useEffect } from "react";
import axios from "axios";

import Style from "../../stylesheets/UserPageTemplate.module.css";

import StudentCard from "../../components/StudentCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";

function App() {
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForStudents = [
    { label: "Todos", value: "none" },
    { label: "Nombre", value: "name" },
    { label: "Apellido", value: "surname" },
    { label: "ID", value: "id" },
    { label: "Número de documento", value: "documento" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/estudiantes");
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, []);

  if (studentsData.length === 0) {
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
          placeholdertext={"Buscar estudiante..."}
          filters={filtersForStudents}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={Style.main_content}>
        {studentsData.map((professor, index) => (
          <StudentCard
            key={index}
            id={professor.ESTUDIANTE_ID}
            nombre={professor.NOMBRE}
            apellido={professor.APELLIDO}
            documento={professor.DOCUMENTO}
            tipoDocumento={professor.TIPO_DOCUMENTO}
            nombreUsuario={professor.USUARIO}
            correoInstitucional={professor.CORREO_INSTITUCIONAL}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
