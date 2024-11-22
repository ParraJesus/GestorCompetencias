import React from "react";
import "./App.css";
import ProfessorCard from "./components/ProfessorCard";
//import EvaluadorCard from "./components/EvaluatorCard";
//import StudentCard from "./components/StudentCard";
//import ProgramCard from "./components/ProgramCard";
//import SearchBar from "./components/SearchBar";
import ProfessorSideMenu from "./components/ProfessorSideMenu";

function App() {
  return (
    <div className="App">
      <div className="main_frame">
        <ProfessorSideMenu />
        <div className="container">
          <div className="header"></div>
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
      </div>
    </div>
  );
}

export default App;
