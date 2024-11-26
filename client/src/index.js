import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
import UserPageTemplate from "./pages/UserPageTemplate";
import CoorPrograms from "./pages/CoorPrograms";
import AdminCompetences from "./pages/AdminCompetences";
import Login from "./pages/Login";
import CoorProfessors from "./pages/CoorProfessors";
import CoorStudents from "./pages/CoorStudents";
import CoorEvaluators from "./pages/CoorEvaluators";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CoorProfessors />
  </React.StrictMode>
);
