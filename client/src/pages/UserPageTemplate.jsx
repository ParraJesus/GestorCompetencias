import React, { useState } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";
import ProfessorCard from "../components/ProfessorCard";
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

  const filtersForProfessors = [
    { label: "Nombre", value: "name" },
    { label: "ID", value: "id" },
    { label: "Número de documento", value: "documento" },
    { label: "Cargo", value: "tipoDocente" },
    { label: "Título académico", value: "ultimoTitulo" },
  ];

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={Style.page_container}>
      <Header titulo={"Título provicional"} isExpanded={isSideMenuExpanded} />
      <div className={Style.main_container}>
        <SideMenu
          menuData={sideMenuData}
          onExpandedChange={handleExpandedChange}
        />
        <main className={Style.main}>
          <div className={Style.main_header}>
            <SearchBar
              placeholdertext={"Buscar profesor..."}
              filters={filtersForProfessors}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className={Style.main_content}>
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
            <ProfessorCard
              nombre={"Melissa"}
              apellido={"Gugu"}
              documento={"1100000000"}
              tipoDocumento={"CC"}
              tipoDocente={"Planta"}
              ultimoTitulo={"Doctorado"}
              id={"001"}
              nombreUsuario={"mgu"}
              correoInstitucional={"mgo@unicauca.edu.co"}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
