import React, { useState } from "react";
import styles from "../stylesheets/SearchBar.module.css";
import { ReactComponent as SearchIcon } from "../assets/bx-search.svg";
import { ReactComponent as CogIcon } from "../assets/bxs-cog.svg";

/*

//const [currentFilter, setCurrentFilter] = useState(""); //guardar en una variable el filtro seleccionado
  //const [searchQuery, setSearchQuery] = useState(""); //guardar en una variable el texto de búsqueda

  //filtros específicos que varían según el contexto
  const filtersForProfessors = [
    { label: "Nombre", value: "name" },
    { label: "ID", value: "id" },
    { label: "Número de documento", value: "documento" },
    { label: "Cargo", value: "tipoDocente" },
    { label: "Título académico", value: "ultimoTitulo" },
  ];

  //lógica para realizar la búsqueda cuando cambia el filtro
  const handleFilterChange = (filter) => {
    //setCurrentFilter(filter);
    //console.log("Filtro actual:", filter);
  };

  //lógica para realizar la búsqueda cuando cambia el texto ingresado
  const handleSearchChange = (query) => {
    //setSearchQuery(query);
    //console.log("Búsqueda actual:", query);
  };

  <SearchBar
          placeholdertext={"Buscar profesor..."}
          filters={filtersForProfessors}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

*/

const SearchBar = ({
  placeholdertext,
  filters,
  onFilterChange,
  onSearchChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.value || "");

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter); // Notifica al padre
  };

  const handleSearchChange = (event) => {
    onSearchChange(event.target.value); // Notifica al padre
  };

  return (
    <div className={styles.searchBar_container}>
      <div className={styles.search_input_container}>
        <SearchIcon className={styles.small_icon} />
        <input
          className={`${styles.search_input} ${styles.input}`}
          type="text"
          placeholder={placeholdertext}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.filter_input_container}>
        <select
          className={`${styles.filter_input} ${styles.input}`}
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
        <CogIcon className={styles.small_icon} />
      </div>
    </div>
  );
};

export default SearchBar;
