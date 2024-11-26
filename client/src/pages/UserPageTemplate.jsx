import React, { useState } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import Header from "../components/Header.jsx";
import SideMenu from "../components/SideMenu.jsx";
import { ReactComponent as ProfessorIcon } from "../assets/bxs-professor.svg";
import { ReactComponent as StudentIcon } from "../assets/bxs-student.svg";
import { ReactComponent as EvaluatorIcon } from "../assets/bxs-evaluator.svg";
import { ReactComponent as ProgramIcon } from "../assets/bxs-program.svg";
import { ReactComponent as MatriculeIcon } from "../assets/bxs-matricule.svg";
import ProfessorCard from "../components/ProfessorCard";

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

  return (
    <div className={Style.page_container}>
      <Header titulo={"Título provicional"} isExpanded={isSideMenuExpanded} />
      <div className={Style.main_container}>
        <SideMenu
          menuData={sideMenuData}
          onExpandedChange={handleExpandedChange}
        />
        <main className={Style.main}>
          <div className={Style.main_header}>adalskj</div>
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
