import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";

import { ReactComponent as MatriculeIcon } from "../assets/bxs-matricule.svg";

const routeTitles = {
  "/profesor/periodos": "Gestión de Clases",
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
      texto: "Matrículas",
      icono: MatriculeIcon,
      expandedItems: [
        { texto: "Listar Programas", enlace: "/profesor/periodos" },
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
