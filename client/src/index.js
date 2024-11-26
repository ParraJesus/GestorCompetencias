import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
//import UserPageTemplate from "./pages/UserPageTemplate";
//import AdminProgram from "./pages/AdminProgram";
import AdminCompetences from "./pages/AdminCompetences";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminCompetences />
  </React.StrictMode>
);
