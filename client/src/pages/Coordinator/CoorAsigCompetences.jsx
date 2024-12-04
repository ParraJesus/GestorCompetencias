import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "../../stylesheets/UserPageTemplate.module.css";

import AsignatureTitleCard from "../../components/AsignatureTitleCard.jsx";
import TitleCard from "../../components/TitleCard.jsx";
import CompetenceCard from "../../components/CompetenceCard.jsx";
import AddCard from "../../components/AddCard.jsx";
import { useParams } from "react-router-dom";

function App() {
  const { id, id_asig } = useParams();

  //Traer competencias de todo el programa
  const [cpData, setCpData] = useState([]);
  const [isLoadingCp, setIsLoadingCp] = useState(true);

  //Traer Competencias de la asignatura plantilla
  const [apCpData, setApCpData] = useState([]);
  const [isLoadingApCp, setIsLoadingApCp] = useState(true);

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

  const handleAgregarClic = async (id_competence) => {
    console.log(`asignatura: ${id_asig} competencia: ${id_competence}`);
    try {
      const response = await axios.post(
        `http://localhost:5000/apcp/${id_asig}/${id_competence}`
      );
      alert(response.data);

      // Refrescar datos después de agregar
      await fetchCpData();
      await fetchApCpData();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el cambio.");
    }
  };

  const handleRemoverClic = async (id_competence) => {
    console.log(`asignatura: ${id_asig} competencia: ${id_competence}`);
    try {
      const response = await axios.delete(
        `http://localhost:5000/apcp/${id_asig}/${id_competence}`
      );
      alert(response.data);

      // Refrescar datos después de remover
      await fetchCpData();
      await fetchApCpData();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el cambio.");
    }
  };

  // Crear funciones separadas para traer los datos
  const fetchCpData = async () => {
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

  const fetchApCpData = async () => {
    try {
      setIsLoadingApCp(true);
      const response = await axios.get(`http://localhost:5000/apcp/${id_asig}`);
      setApCpData(response.data.CompetenciasJSON);
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    } finally {
      setIsLoadingApCp(false);
    }
  };

  // Actualizar useEffect para que usen las nuevas funciones
  useEffect(() => {
    fetchCpData();
  }, [id]);

  useEffect(() => {
    fetchApCpData();
  }, [id_asig]);

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
                handleRel={handleRemoverClic}
                buttonText={"Remover"}
              />
            ))
          )}
        </div>
      </div>
      <div className={Style.main_column}>
        <div className={Style.main_header}>
          <TitleCard titulo={"Competencias de Programa"} />
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
                handleRel={handleAgregarClic}
                buttonText={"Agregar"}
              />
            ))
          )}
          <AddCard
            enlace={`/coordinador/programas/${id}/${id_asig}/competencias/registrar`}
            hoverTitle={"Añadir Competencia del programa"}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
