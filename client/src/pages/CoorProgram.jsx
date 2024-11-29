import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Style from "../stylesheets/UserPageTemplate.module.css";

import ProgramTitleCard from "../components/ProgramTitleCard.jsx";
import SemesterCard from "../components/SemesterCard.jsx";

function App() {
  const { id } = useParams();
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/programas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener los datos del programa ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        setProgramData(data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  }, [id]);

  if (programData.length === 0) {
    return <div>Cargando...</div>;
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
