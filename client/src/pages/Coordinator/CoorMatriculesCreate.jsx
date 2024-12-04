import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Style from "../../stylesheets/UserPageTemplate.module.css";
import TitleCardNavigation from "../../components/TitleCardNavigation";
import SelectableAsignatureCard from "../../components/SelectableAsignatureCard";
import SelectableProfessorCard from "../../components/SelectableProfessorCard";
import SelectableEvaluatorCard from "../../components/SelectableEvaluatorCard";
import SelectableStudentCard from "../../components/SelectableStudentCard";

function App() {
  const navigate = useNavigate();
  const { periodo_id, programa_id } = useParams();

  const [activeSection, setActiveSection] = useState(null);
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const [selectedAsignature, setSelectedAsignature] = useState("-1");
  const handleAsignatureSelection = (ap_id) => {
    setSelectedAsignature((prev) => (prev === ap_id ? "" : ap_id));
  };

  const [selectedProfessor, setSelectedProfesor] = useState("-1");
  const handleProfessorSelection = (profesor_id) => {
    setSelectedProfesor((prev) => (prev === profesor_id ? "" : profesor_id));
  };

  const [selectedEvaluator, setSelectedEvaluator] = useState("-1");
  const handleEvaluatorSelection = (evaluador_id) => {
    setSelectedEvaluator((prev) => (prev === evaluador_id ? "" : evaluador_id));
  };

  const [selectedStudents, setSelectedStudents] = useState([]);
  const handleStudentSelection = (estudiante_id) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(estudiante_id)) {
        return prevSelected.filter((id) => id !== estudiante_id);
      } else {
        return [...prevSelected, estudiante_id];
      }
    });
  };

  //Traer datos de asignaturas plantilla
  const [programData, setProgramData] = useState([]);
  const [isLoadingprogramData, setIsLoadingprogramData] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingprogramData(true);
        const response = await axios.get(
          `http://localhost:5000/programas/${programa_id}`
        );
        const asignaturas = response.data[0].SEMESTRES.flatMap(
          (semestre) => semestre.ASIGNATURAS
        );
        setProgramData(asignaturas);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingprogramData(false);
      }
    };
    fetchItems();
  }, [programa_id]);

  //Traer datos de profesores
  const [professorData, setProfessorData] = useState([]);
  const [isLoadingProfessorData, setIsLoadingProfessorData] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingProfessorData(true);
        const response = await axios.get(`http://localhost:5000/profesores/`);
        setProfessorData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingProfessorData(false);
      }
    };
    fetchItems();
  }, [programa_id]);

  //Traer datos de evaluadores
  const [evaluatorData, setEvaluatorData] = useState([]);
  const [isLoadingEvaluatorData, setIsloadingEvaluatorData] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsloadingEvaluatorData(true);
        const response = await axios.get(`http://localhost:5000/evaluadores/`);
        setEvaluatorData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsloadingEvaluatorData(false);
      }
    };
    fetchItems();
  }, [programa_id]);

  //Traer datos de estudiantes
  const [studentData, setStudentData] = useState([]);
  const [isLoadingStudentData, setIsLoadingStudentData] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoadingStudentData(true);
        const response = await axios.get(`http://localhost:5000/estudiantes/`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setIsLoadingStudentData(false);
      }
    };
    fetchItems();
  }, [programa_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los datos necesarios estén seleccionados
    if (
      selectedAsignature === "-1" ||
      selectedProfessor === "-1" ||
      selectedEvaluator === "-1" ||
      selectedStudents.length === 0
    ) {
      alert(
        "Debe seleccionar todos los campos obligatorios antes de registrar."
      );
      return;
    }

    const matriculaData = {
      asignaturaPlantillaId: selectedAsignature,
      grupo: "B",
      profesorId: selectedProfessor,
      evaluadorId: selectedEvaluator,
      estudiantes: selectedStudents,
      periodoId: periodo_id,
      programaId: programa_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/matriculas/registrar",
        matriculaData
      );
      alert("Matrícula registrada con éxito.");
      navigate(`/coordinador/matriculas/${periodo_id}/${programa_id}/`);
    } catch (error) {
      console.error("Error al registrar la matrícula:", error);
      alert("Hubo un error al registrar la matrícula.");
    }
  };

  return (
    <main className={Style.main}>
      <div className={Style.main_header}>
        <TitleCardNavigation
          titulo={"Registrar Matrícula"}
          enlace={`/coordinador/matriculas/${periodo_id}/${programa_id}`}
        />
      </div>
      <div className={`${Style.main_content} ${Style.main_matricule}`}>
        <hr className={Style.divisor} />
        <section>
          <h2
            onClick={() => toggleSection("asignatura")}
            className={`selectable`}
          >
            Seleccionar Asignatura:
          </h2>
          <div
            className={`${Style.main_section}`}
            style={{
              maxHeight: activeSection === "asignatura" ? "600px" : "0",
              overflowY: activeSection === "asignatura" ? "scroll" : "hidden",
            }}
          >
            {!isLoadingprogramData &&
              programData.map((program, index) => (
                <SelectableAsignatureCard
                  key={index}
                  id_asig={program.AP_ID}
                  nombre={program.AP_NOMBRE}
                  creditos={program.AP_CREDITOS}
                  horas_semana={program.AP_HORAS_SEMANA}
                  modalidad={program.AP_MODALIDAD}
                  handleSelection={handleAsignatureSelection}
                  isSelected={selectedAsignature === program.AP_ID}
                />
              ))}
          </div>
        </section>
        <hr className={Style.divisor} />
        <section>
          <h2
            onClick={() => toggleSection("profesor")}
            className={`selectable`}
          >
            Seleccionar Profesor:
          </h2>
          <div
            className={`${Style.main_section}`}
            style={{
              maxHeight: activeSection === "profesor" ? "600px" : "0",
              overflowY: activeSection === "profesor" ? "scroll" : "hidden",
            }}
          >
            {!isLoadingProfessorData &&
              professorData.map((professor, index) => (
                <SelectableProfessorCard
                  key={index}
                  nombre={professor.APELLIDO}
                  apellido={professor.NOMBRE}
                  ultimoTitulo={professor.ULTIMO_TITULO}
                  tipoDocente={professor.TIPO_DOCENTE}
                  documento={professor.DOCUMENTO}
                  tipoDocumento={professor.TIPO_DOCUMENTO}
                  id={professor.PROF_ID}
                  handleSelection={handleProfessorSelection}
                  isSelected={selectedProfessor === professor.PROF_ID}
                />
              ))}
          </div>
        </section>
        <hr className={Style.divisor} />
        <section>
          <h2
            onClick={() => toggleSection("evaluador")}
            className={`selectable`}
          >
            Seleccionar Evaluador:
          </h2>
          <div
            className={`${Style.main_section}`}
            style={{
              maxHeight: activeSection === "evaluador" ? "600px" : "0",
              overflowY: activeSection === "evaluador" ? "scroll" : "hidden",
            }}
          >
            {!isLoadingEvaluatorData &&
              evaluatorData.map((evaluator, index) => (
                <SelectableEvaluatorCard
                  key={index}
                  nombre={evaluator.APELLIDO}
                  apellido={evaluator.NOMBRE}
                  documento={evaluator.DOCUMENTO}
                  tipoDocumento={evaluator.TIPO_DOCUMENTO}
                  correoInstitucional={evaluator.CORREO_INSTITUCIONAL}
                  id={evaluator.EVALUADOR_ID}
                  handleSelection={handleEvaluatorSelection}
                  isSelected={selectedEvaluator === evaluator.EVALUADOR_ID}
                />
              ))}
          </div>
        </section>
        <hr className={Style.divisor} />
        <section>
          <h2
            onClick={() => toggleSection("estudiantes")}
            className={`selectable`}
          >
            Seleccionar Estudiantes:
          </h2>
          <div
            className={`${Style.main_section}`}
            style={{
              maxHeight: activeSection === "estudiantes" ? "600px" : "0",
              overflowY: activeSection === "estudiantes" ? "scroll" : "hidden",
            }}
          >
            {!isLoadingStudentData &&
              studentData.map((estudiante, index) => (
                <SelectableStudentCard
                  key={index}
                  nombre={estudiante.APELLIDO}
                  apellido={estudiante.NOMBRE}
                  documento={estudiante.DOCUMENTO}
                  tipoDocumento={estudiante.TIPO_DOCUMENTO}
                  correoInstitucional={estudiante.CORREO_INSTITUCIONAL}
                  id={estudiante.ESTUDIANTE_ID}
                  handleSelection={handleStudentSelection}
                  isSelected={selectedStudents.includes(
                    estudiante.ESTUDIANTE_ID
                  )}
                />
              ))}
          </div>
        </section>
        <hr className={Style.divisor} />
        <button className="button-first" onClick={handleSubmit}>
          Registrar
        </button>
      </div>
    </main>
  );
}

export default App;
