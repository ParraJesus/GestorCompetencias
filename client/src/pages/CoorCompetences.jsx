import React, { useState } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";
import AsignatureTitleCard from "../components/AsignatureTitleCard.jsx";
import TitleCard from "../components/TitleCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CompetenceCard from "../components/CompetenceCard.jsx";

import { ReactComponent as ProfessorIcon } from "../assets/bxs-professor.svg";
import { ReactComponent as StudentIcon } from "../assets/bxs-student.svg";
import { ReactComponent as EvaluatorIcon } from "../assets/bxs-evaluator.svg";
import { ReactComponent as ProgramIcon } from "../assets/bxs-program.svg";
import { ReactComponent as MatriculeIcon } from "../assets/bxs-matricule.svg";

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

  const competencesData = [
    {
      id: "001",
      nombre: "Competencia 1",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat. Fusce vel vestibulum ipsum. Integer et turpis malesuada, pharetra leo et, dictum nulla. Nam ac sapien nec ipsum consectetur fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
      nivel: "Alto",
      ponderacion: "",
      RA: [
        {
          id: "001",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat.",
          ponderacion: "100%",
          RU: [
            {
              id: "001",
              descripcion:
                "fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
              ponderacion: "100%",
            },
          ],
        },
      ],
    },
    {
      id: "002",
      nombre: "Competencia 2",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat. Fusce vel vestibulum ipsum. Integer et turpis malesuada, pharetra leo et, dictum nulla. Nam ac sapien nec ipsum consectetur fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
      nivel: "Alto",
      ponderacion: "",
      RA: [
        {
          id: "002",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat.",
          ponderacion: "100%",
          RU: [
            {
              id: "002",
              descripcion:
                "fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
              ponderacion: "100%",
            },
          ],
        },
      ],
    },
    {
      id: "003",
      nombre: "Competencia 3",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat. Fusce vel vestibulum ipsum. Integer et turpis malesuada, pharetra leo et, dictum nulla. Nam ac sapien nec ipsum consectetur fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
      nivel: "Alto",
      ponderacion: "",
      RA: [
        {
          id: "003",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec cursus justo, mollis lacinia sem. Pellentesque maximus interdum placerat.",
          ponderacion: "100%",
          RU: [
            {
              id: "003",
              descripcion:
                "fringilla vitae sit amet est. Proin ornare volutpat purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus",
              ponderacion: "100%",
            },
          ],
        },
      ],
    },
  ];

  return (
    <main className={`${Style.main} ${Style.main_two_columns}`}>
      <div className={Style.main_column}>
        <div className={Style.main_header}>
          <AsignatureTitleCard nombre={"Cálculo 1"} id={"001"} />
        </div>
        <div className={Style.main_content}></div>
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
          {competencesData.map((competence) => (
            <CompetenceCard key={competence.id} competenceData={competence} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
