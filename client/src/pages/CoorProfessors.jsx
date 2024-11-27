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
    { label: "Nombre", value: "nombre" },
    { label: "Apellido", value: "apellido" },
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

  const professorsData = [
    {
      id: "1",
      nombre: "Ricardo",
      apellido: "Zambrano",
      documento: "1234567890",
      tipoDocumento: "CC",
      tipoDocente: "Planta :(",
      ultimoTitulo: "Magister en ser genial",
      nombreUsuario: "rzambrano",
      correoInstitucional: "rzambrano@unicauca.edu.co",
    },
    {
      id: "2",
      nombre: "Francisco",
      apellido: "Obando",
      documento: "1234567890",
      tipoDocumento: "CC",
      tipoDocente: "Planta",
      ultimoTitulo: "Magister",
      nombreUsuario: "fobando",
      correoInstitucional: "fobando@unicauca.edu.co",
    },
    {
      id: "2",
      nombre: "Daniel",
      apellido: "Paz",
      documento: "1234567890",
      tipoDocumento: "CC",
      tipoDocente: "Planta",
      ultimoTitulo: "Magister",
      nombreUsuario: "dpaz",
      correoInstitucional: "dpaz@unicauca.edu.co",
    },
  ];

  return (
    <div className={Style.page_container}>
      <Header titulo={"Gestión Profesores"} isExpanded={isSideMenuExpanded} />
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
            {professorsData.map((professor) => (
              <ProfessorCard
                key={professor.id}
                id={professor.id}
                nombre={professor.nombre}
                apellido={professor.apellido}
                documento={professor.documento}
                tipoDocumento={professor.tipoDocumento}
                tipoDocente={professor.tipoDocente}
                ultimoTitulo={professor.ultimoTitulo}
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
