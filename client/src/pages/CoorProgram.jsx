import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Style from "../stylesheets/UserPageTemplate.module.css";

import ProgramTitleCard from "../components/ProgramTitleCard.jsx";
import SemesterCard from "../components/SemesterCard.jsx";

function App() {
  const { id } = useParams();
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/programas/${id}`
        );
        setProgramData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
    fetchItems();
  }, [id]);

  if (programData.length === 0) {
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
        <ProgramTitleCard
          enlace={"/coordinador/programas/"}
          nombre={programData[0].NOMBRE}
          id={programData[0].PROGRAMA_ID}
          modalidad={programData[0].MODALIDAD}
          tipoPrograma={programData[0].TIPO_PROGRAMA}
          facultad={programData[0].FACULTAD}
        />
      </div>
      <div className={Style.main_content}>
        {programData[0].SEMESTRES.map((semestre, index) => {
          if (semestre.ASIGNATURAS && semestre.ASIGNATURAS.length > 0) {
            return <SemesterCard key={index} semesterData={semestre} />;
          }
          return null;
        })}
      </div>
    </main>
  );
}

export default App;
