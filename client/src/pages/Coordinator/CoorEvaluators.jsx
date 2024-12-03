import React, { useState, useEffect } from "react";
import axios from "axios";

import Style from "../../stylesheets/UserPageTemplate.module.css";

import EvaluatorCard from "../../components/EvaluatorCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";

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
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/evaluadores");
        setEvaluatorsData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, []);

  if (evaluatorsData.length === 0) {
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

  const updateEvaluatorState = (id, newState) => {
    setEvaluatorsData((prevData) =>
      prevData.map((evaluator) =>
        evaluator.EVALUADOR_ID === id
          ? { ...evaluator, ESTADO: newState }
          : evaluator
      )
    );
  };

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
            estado={evaluator.ESTADO}
            onUpdateState={updateEvaluatorState}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
