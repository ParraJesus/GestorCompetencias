import React, { useState } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";
import EvaluatorCard from "../components/EvaluatorCard.jsx";
import SearchBar from "../components/SearchBar";
import { ReactComponent as ProfessorIcon } from "../assets/bxs-professor.svg";
import { ReactComponent as StudentIcon } from "../assets/bxs-student.svg";
import { ReactComponent as EvaluatorIcon } from "../assets/bxs-evaluator.svg";
import { ReactComponent as ProgramIcon } from "../assets/bxs-program.svg";
import { ReactComponent as MatriculeIcon } from "../assets/bxs-matricule.svg";

function App() {
  const [isSideMenuExpanded, setSideMenuExpanded] = useState(false);

  const handleExpandedChange = (value) => {
    setSideMenuExpanded(value);
  };

  const sideMenuData = [
    {
      texto: "Profesores",
      icono: ProfessorIcon,
      expandedItems: [
        { texto: "Crear Profesor", enlace: "/" },
        { texto: "Listar Profesores", enlace: "/" },
      ],
    },
    {
      texto: "Estudiantes",
      icono: StudentIcon,
      expandedItems: [
        { texto: "Crear Estudiante", enlace: "/" },
        { texto: "Listar Estudiantes", enlace: "/" },
      ],
    },
    {
      texto: "Evaluadores",
      icono: EvaluatorIcon,
      expandedItems: [{ texto: "Asignar Evaluador", enlace: "/" }],
    },
    {
      texto: "Programas",
      icono: ProgramIcon,
      expandedItems: [{ texto: "Crear Programa", enlace: "/" }],
    },
    {
      texto: "Matrículas",
      icono: MatriculeIcon,
      expandedItems: [{ texto: "Registrar Matrícula", enlace: "/" }],
    },
  ];

  const [currentFilter, setCurrentFilter] = useState(""); //guardar en una variable el filtro seleccionado
  const [searchQuery, setSearchQuery] = useState(""); //guardar en una variable el texto de búsqueda

  const filtersForEvaluators = [
    { label: "Nombre", value: "name" },
    { label: "Apellido", value: "name" },
    { label: "ID", value: "id" },
    { label: "Número de documento", value: "documento" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const evaluatorsData = [
    {
      id: "1",
      nombre: "Pablo",
      apellido: "Morillo",
      documento: "1234567890",
      tipoDocumento: "CC",
      nombreUsuario: "pmorillo",
      correoInstitucional: "pmorillo@unicauca.edu.co",
    },
  ];

  return (
    <div className={Style.page_container}>
      <Header titulo={"Gestión Evaluadores"} isExpanded={isSideMenuExpanded} />
      <div className={Style.main_container}>
        <SideMenu
          menuData={sideMenuData}
          onExpandedChange={handleExpandedChange}
        />
        <main className={Style.main}>
          <div className={Style.main_header}>
            <SearchBar
              placeholdertext={"Buscar evaluador..."}
              filters={filtersForEvaluators}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className={Style.main_content}>
            {evaluatorsData.map((professor) => (
              <EvaluatorCard
                key={professor.id}
                id={professor.id}
                nombre={professor.nombre}
                apellido={professor.apellido}
                documento={professor.documento}
                tipoDocumento={professor.tipoDocumento}
                nombreUsuario={professor.nombreUsuario}
                correoInstitucional={professor.correoInstitucional}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
