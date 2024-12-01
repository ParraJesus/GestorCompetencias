import CoorLayout from "./static/CoorLayout";
import StudentLayout from "./static/StudentLayout";
import ProfessorLayout from "./static/ProfessorLayout";
import EvaluatorLayout from "./static/EvaluatorLayout";

import PrivateRoute from "./PrivateRouter";
import CoorProfessors from "./pages/CoorProfessors";
import CoorEvaluators from "./pages/CoorEvaluators";
import CoorStudents from "./pages/CoorStudents";
import CoorPrograms from "./pages/CoorPrograms";
import CoorProgram from "./pages/CoorProgram";
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
      { path: "matriculas", element: <NotFound /> },
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
