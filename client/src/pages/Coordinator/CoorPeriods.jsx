import React, { useState, useEffect } from "react";
import axios from "axios";

import Style from "../../stylesheets/UserPageTemplate.module.css";

import SearchBar from "../../components/SearchBar";
import PeriodCard from "../../components/PeriodCard";

function App() {
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForPeriods = [
    { label: "Todos", value: "none" },
    { label: "Año", value: "year" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const [periodsData, setPeriodsData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/periodos");
        setPeriodsData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, []);

  if (periodsData.length === 0) {
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
    <main className={`${Style.main}`}>
      <div className={Style.main_header}>
        <SearchBar
          placeholdertext={"Buscar periodo..."}
          filters={filtersForPeriods}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={`${Style.main_content} ${Style.main_grid}`}>
        {periodsData.map((periodo, index) => (
          <PeriodCard
            key={index}
            periodo_id={periodo.PERIODO_ID}
            ano={periodo.ANO}
            ciclo={periodo.CICLO}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
