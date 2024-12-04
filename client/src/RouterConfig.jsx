//Seguridad
import PrivateRoute from "./PrivateRouter";

//Estáticos
import CoorLayout from "./static/CoorLayout";
import StudentLayout from "./static/StudentLayout";
import ProfessorLayout from "./static/ProfessorLayout";
import EvaluatorLayout from "./static/EvaluatorLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

//Gestión de profesores
import CoorProfessors from "./pages/Coordinator/CoorProfessors";
import CoorProfessorsCreate from "./pages/Coordinator/CoorProfessorsCreate";
import CoorProfessorsEdit from "./pages/Coordinator/CoorProfessorEdit";

//Gestión de evaluadores
import CoorEvaluators from "./pages/Coordinator/CoorEvaluators";
import CoorEvaluatorsCreate from "./pages/Coordinator/CoorEvaluatorsCreate";
import CoorEvaluatorsEdit from "./pages/Coordinator/CoorEvaluatorsEdit";

//Gestión de estudiantes
import CoorStudents from "./pages/Coordinator/CoorStudents";
import CoorStudentsCreate from "./pages/Coordinator/CoorStudentsCreate";
import CoorStudentsEdit from "./pages/Coordinator/CoorStudentsEdit";

//Gestión de programas
import CoorPrograms from "./pages/Coordinator/CoorPrograms";
import CoorProgram from "./pages/Coordinator/CoorProgram";
import CoorProgramsCreate from "./pages/Coordinator/CoorProgramsCreate";
import CoorProgramsEdit from "./pages/Coordinator/CoorProgramsEdit";
import CoorMatriculePrograms from "./pages/Coordinator/CoorMatriculePrograms";
import CoorAPCreate from "./pages/Coordinator/CoorAPCreate";
import CoorAPEdit from "./pages/Coordinator/CoorAPEdit";

//Gestión de periodos
import CoorPeriods from "./pages/Coordinator/CoorPeriods";
import CoorMatricules from "./pages/Coordinator/CoorMatricules";
import CoorMatriculesCreate from "./pages/Coordinator/CoorMatriculesCreate";
import CoorMatriculesEdit from "./pages/Coordinator/CoorMatriculesEdit";

//Competencias
import CoorAsigCompetences from "./pages/Coordinator/CoorAsigCompetences";
import CoorAsigCompetencesCreate from "./pages/Coordinator/CoorAsigCompetencesCreate";
import CoorAsigCompetencesEdit from "./pages/Coordinator/CoorAsigCompetencesEdit";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/coordinador",
    element: (
      <PrivateRoute allowedRoles={["coordinador"]}>
        <CoorLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "estudiantes", element: <CoorStudents /> },
      { path: "estudiantes/registrar", element: <CoorStudentsCreate /> },
      { path: "estudiantes/editar/:id", element: <CoorStudentsEdit /> },

      { path: "profesores", element: <CoorProfessors /> },
      { path: "profesores/registrar", element: <CoorProfessorsCreate /> },
      { path: "profesores/editar/:id", element: <CoorProfessorsEdit /> },

      { path: "evaluadores", element: <CoorEvaluators /> },
      { path: "evaluadores/registrar", element: <CoorEvaluatorsCreate /> },
      { path: "evaluadores/editar/:id", element: <CoorEvaluatorsEdit /> },

      { path: "programas", element: <CoorPrograms /> },
      { path: "programas/registrar", element: <CoorProgramsCreate /> },
      { path: "programas/editar/:id", element: <CoorProgramsEdit /> },
      { path: "programas/:id", element: <CoorProgram /> },
      { path: "programas/:id/registrar", element: <CoorAPCreate /> },
      { path: "programas/:id/editar/:id_ap", element: <CoorAPEdit /> },
      { path: "programas/:id/:id_asig", element: <CoorAsigCompetences /> },
      {
        path: "programas/:id/:id_asig/competencias/registrar",
        element: <CoorAsigCompetencesCreate />,
      },
      {
        path: "programas/:id/:id_asig/competencias/editar/:id_cp",
        element: <CoorAsigCompetencesEdit />,
      },

      { path: "matriculas", element: <CoorPeriods /> },
      { path: "matriculas/:periodo_id", element: <CoorMatriculePrograms /> },
      {
        path: "matriculas/:periodo_id/:programa_id",
        element: <CoorMatricules />,
      },
      {
        path: "matriculas/:periodo_id/:programa_id/registrar",
        element: <CoorMatriculesCreate />,
      },
      {
        path: "matriculas/:periodo_id/:programa_id/editar/:id",
        element: <CoorMatriculesEdit />,
      },
    ],
  },
  {
    path: "/estudiante",
    element: (
      <PrivateRoute allowedRoles={["estudiante"]}>
        <StudentLayout />
      </PrivateRoute>
    ),
    children: [{ path: "programas", element: <NotFound /> }],
  },
  {
    path: "/profesor",
    element: (
      <PrivateRoute allowedRoles={["profesor"]}>
        <ProfessorLayout />
      </PrivateRoute>
    ),
    children: [{ path: "periodos", element: <NotFound /> }],
  },
  {
    path: "/evaluador",
    element: (
      <PrivateRoute allowedRoles={["evaluador"]}>
        <EvaluatorLayout />
      </PrivateRoute>
    ),
    children: [{ path: "periodos", element: <NotFound /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
