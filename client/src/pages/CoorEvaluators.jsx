import React, { useState, useEffect } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import EvaluatorCard from "../components/EvaluatorCard.jsx";
import SearchBar from "../components/SearchBar";

function App() {
  const [currentFilter, setCurrentFilter] = useState(""); //guardar en una variable el filtro seleccionado
  const [searchQuery, setSearchQuery] = useState(""); //guardar en una variable el texto de búsqueda

  const filtersForEvaluators = [
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

  const [evaluatorsData, setEvaluatorsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/evaluadores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los evaluadores");
        }
        return response.json();
      })
      .then((data) => {
        setEvaluatorsData(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  }, []);

  if (evaluatorsData.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <SearchBar
          placeholdertext={"Buscar evaluador..."}
          filters={filtersForEvaluators}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={Style.main_content}>
        {evaluatorsData.map((evaluator, index) => (
          <EvaluatorCard
            key={index}
            id={evaluator.EVALUADOR_ID}
            nombre={evaluator.NOMBRE}
            apellido={evaluator.APELLIDO}
            documento={evaluator.DOCUMENTO}
            tipoDocumento={evaluator.TIPO_DOCUMENTO}
            nombreUsuario={evaluator.USUARIO}
            correoInstitucional={evaluator.CORREO_INSTITUCIONAL}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
