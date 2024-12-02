import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../../stylesheets/UserPageTemplate.module.css";

import AsignatureTitleCard from "../../components/AsignatureTitleCard.jsx";
import TitleCard from "../../components/TitleCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import CompetenceCard from "../../components/CompetenceCard.jsx";
import { useParams } from "react-router-dom";

function App() {
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtersForCompetences = [
    { label: "Todos", value: "none" },
    { label: "ID", value: "id" },
    { label: "Nombre", value: "nombre" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleAgregarClic = () => {
    console.log("agregado");
  };

  const handleRemoverClic = () => {
    console.log("removido");
  };

  const { id, id_asig } = useParams();

  //Traer competencias de todo el programa
  const [cpData, setCpData] = useState([]);
  const [isLoadingCp, setIsLoadingCp] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingCp(true);
        const response = await axios.get(
          `http://localhost:5000/competenciasprograma/${id}`
        );
        setCpData(response.data.CompetenciasJSON);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingCp(false);
      }
    };
    fetchItems();
  }, [id, id_asig]);

  //Traer Competencias de la asignatura plantilla
  const [apCpData, setApCpData] = useState([]);
  const [isLoadingApCp, setIsLoadingApCp] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingApCp(true);
        const response = await axios.get(
          `http://localhost:5000/apcp/${id_asig}`
        );
        setApCpData(response.data.CompetenciasJSON);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingApCp(false);
      }
    };
    fetchItems();
  }, [id, id_asig]);

  //Traer datos de la asignatura plantilla
  const [apData, setApData] = useState([]);
  const [isLoadingAp, setIsLoadingAp] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingAp(true);
        const response = await axios.get(
          `http://localhost:5000/asig_plantilla/${id_asig}`
        );
        setApData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingAp(false);
      }
    };
    fetchItems();
  }, [id, id_asig]);

  return (
    <main className={`${Style.main} ${Style.main_two_columns}`}>
      <div className={Style.main_column}>
        <div className={Style.main_header}>
          {!isLoadingAp && (
            <AsignatureTitleCard
              nombre={apData.NOMBRE}
              id={apData.AP_ID}
              enlace={`/coordinador/programas/${id}`}
            />
          )}
        </div>
        <div className={Style.main_content}>
          {isLoadingApCp ? (
            <p className="paragraph">
              Cargando competencias de la asignatura...
            </p>
          ) : (
            apCpData &&
            apCpData.map((competence, index) => (
              <CompetenceCard
                key={index}
                competenceData={competence}
                onClick={handleRemoverClic}
                buttonText={"Remover"}
              />
            ))
          )}
        </div>
      </div>
      <div className={Style.main_column}>
        <div className={Style.main_header}>
          <TitleCard titulo={"Competencias de Programa"} />
          <SearchBar
            placeholdertext={"Buscar competencia..."}
            filters={filtersForCompetences}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />
        </div>
        <div className={Style.main_content}>
          {isLoadingCp ? (
            <p className="paragraph">Cargando competencias...</p>
          ) : (
            cpData &&
            cpData.map((competence, index) => (
              <CompetenceCard
                key={index}
                competenceData={competence}
                onClick={handleAgregarClic}
                buttonText={"Agregar"}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
