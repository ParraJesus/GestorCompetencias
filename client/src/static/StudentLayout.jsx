import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";

import { ReactComponent as ProgramIcon } from "../assets/bxs-program.svg";

const routeTitles = {
  "/estudiante/programas": "Gestión de Programas",
};

const App = () => {
  const location = useLocation();

  const headerTitulo = routeTitles[location.pathname] || "Estudiante";

  const [isSideMenuExpanded, setSideMenuExpanded] = useState(false);

  const handleExpandedChange = (value) => {
    setSideMenuExpanded(value);
  };

  const sideMenuData = [
    {
      texto: "Programas",
      icono: ProgramIcon,
      expandedItems: [
        { texto: "Listar Programas", enlace: "/estudiante/programas" },
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
