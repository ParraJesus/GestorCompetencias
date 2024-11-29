import React, { useState } from "react";
import Style from "../stylesheets/UserPageTemplate.module.css";
import ProgramTitleCard from "../components/ProgramTitleCard.jsx";
import SemesterCard from "../components/SemesterCard.jsx";

function App() {
  const programData = [
    {
      semestre: "1",
      asignaturas: [
        {
          id: "001",
          nombre: "Cálculo 1",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "002",
          nombre: "Introducción a la informática",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
      ],
    },
    {
      semestre: "2",
      asignaturas: [
        {
          id: "003",
          nombre: "Cálculo 2",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "004",
          nombre: "Programación orientada a objetos",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
      ],
    },
    {
      semestre: "3",
      asignaturas: [
        {
          id: "005",
          nombre: "Cálculo 3",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "006",
          nombre: "Estructura de Datos I",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "007",
          nombre: "Electromagnetismo",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "006",
          nombre: "Estructura de Datos I",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "006",
          nombre: "Estructura de Datos I",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
      ],
    },
    {
      semestre: "4",
      asignaturas: [
        {
          id: "005",
          nombre: "Cálculo 3",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "006",
          nombre: "Estructura de Datos I",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "007",
          nombre: "Electromagnetismo",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
      ],
    },
    {
      semestre: "5",
      asignaturas: [
        {
          id: "005",
          nombre: "Cálculo 3",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "006",
          nombre: "Estructura de Datos I",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
        {
          id: "007",
          nombre: "Electromagnetismo",
          descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequatLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          creditos: "4",
          semestre: "1",
          horas_semana: "4",
          modalidad: "Presencial",
          tipo_materia: "Teórica",
        },
      ],
    },
  ];

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <ProgramTitleCard
          enlace={"/"}
          nombre={"Ingeniería de Sistemas"}
          id={"001"}
          modalidad={"Presencial"}
          tipoPrograma={"Pregrado"}
          facultad={"Ingeniería Electrónica y Telecomunicaciones"}
        />
      </div>
      <div className={Style.main_content}>
        {programData.map((semester) => (
          <SemesterCard key={semester.semestre} semesterData={semester} />
        ))}
      </div>
    </main>
  );
}

export default App;
