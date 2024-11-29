import CoorLayout from "./static/CoorLayout";
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
    element: <NotFound />,
  },
  {
    path: "/coordinador",
    element: <CoorLayout />,
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
