import CoorLayout from "./static/CoorLayout";
import StudentLayout from "./static/StudentLayout";
import ProfessorLayout from "./static/ProfessorLayout";
import EvaluatorLayout from "./static/EvaluatorLayout";

import PrivateRoute from "./PrivateRouter";
import CoorProfessors from "./pages/Coordinator/CoorProfessors";
import CoorEvaluators from "./pages/Coordinator/CoorEvaluators";
import CoorStudents from "./pages/Coordinator/CoorStudents";
import CoorPrograms from "./pages/Coordinator/CoorPrograms";
import CoorProgram from "./pages/Coordinator/CoorProgram";
import CoorPeriods from "./pages/Coordinator/CoorPeriods";
import CoorMatriculePrograms from "./pages/Coordinator/CoorMatriculePrograms";
import CoorMatricules from "./pages/Coordinator/CoorMatricules";
import CoorAsigCompetences from "./pages/Coordinator/CoorAsigCompetences";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

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
      { path: "profesores", element: <CoorProfessors /> },
      { path: "evaluadores", element: <CoorEvaluators /> },
      { path: "programas", element: <CoorPrograms /> },
      { path: "programas/:id", element: <CoorProgram /> },
      { path: "programas/:id/:id_asig", element: <CoorAsigCompetences /> },
      { path: "matriculas", element: <CoorPeriods /> },
      { path: "matriculas/:periodo_id", element: <CoorMatriculePrograms /> },
      {
        path: "matriculas/:periodo_id/:programa_id",
        element: <CoorMatricules />,
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
