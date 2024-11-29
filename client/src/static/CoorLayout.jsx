import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";

import { ReactComponent as ProfessorIcon } from "../assets/bxs-professor.svg";
import { ReactComponent as StudentIcon } from "../assets/bxs-student.svg";
import { ReactComponent as EvaluatorIcon } from "../assets/bxs-evaluator.svg";
import { ReactComponent as ProgramIcon } from "../assets/bxs-program.svg";
import { ReactComponent as MatriculeIcon } from "../assets/bxs-matricule.svg";

const routeTitles = {
  "/coordinador/estudiantes": "Gestión de Estudiantes",
  "/coordinador/profesores": "Gestión de Profesores",
  "/coordinador/evaluadores": "Gestión de Evaluadores",
  "/coordinador/programas": "Gestión de Programas",
  "/coordinador/programas/:id": "Gestión",
  "/coordinador/matriculas": "Gestión de Matrículas",
};

const App = () => {
  const location = useLocation();

  const headerTitulo = routeTitles[location.pathname] || "Coordinador";

  const [isSideMenuExpanded, setSideMenuExpanded] = useState(false);

  const handleExpandedChange = (value) => {
    setSideMenuExpanded(value);
  };

  const sideMenuData = [
    {
      texto: "Profesores",
      icono: ProfessorIcon,
      expandedItems: [
        { texto: "Listar Profesores", enlace: "/coordinador/profesores" },
      ],
    },
    {
      texto: "Estudiantes",
      icono: StudentIcon,
      expandedItems: [
        { texto: "Listar Estudiantes", enlace: "/coordinador/estudiantes" },
      ],
    },
    {
      texto: "Evaluadores",
      icono: EvaluatorIcon,
      expandedItems: [
        { texto: "Listar Evaluadores", enlace: "/coordinador/evaluadores" },
      ],
    },
    {
      texto: "Programas",
      icono: ProgramIcon,
      expandedItems: [
        { texto: "Listar Programas", enlace: "/coordinador/programas" },
      ],
    },
    {
      texto: "Matrículas",
      icono: MatriculeIcon,
      expandedItems: [
        { texto: "Gestionar Matrículas", enlace: "/coordinador/matriculas" },
      ],
    },
  ];

  return (
    <div className={Style.page_container}>
      <Header titulo={headerTitulo} isExpanded={isSideMenuExpanded} />{" "}
      <div className={Style.main_container}>
        <SideMenu
          menuData={sideMenuData}
          onExpandedChange={handleExpandedChange}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
