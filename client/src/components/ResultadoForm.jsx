import React from "react";
import Rubrica from "./RubricaForm";

import FormStyle from "../stylesheets/Form.module.css";

function Resultado({ data, onChange, onDelete }) {
  const handleFieldChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleRubricaChange = (index, newRubrica) => {
    const newRubricas = [...data.rubricas];
    newRubricas[index] = newRubrica;
    handleFieldChange("rubricas", newRubricas);
  };

  const handleAddRubrica = () => {
    handleFieldChange("rubricas", [
      ...data.rubricas,
      { descripcion: "", ponderacion: 0 },
    ]);
  };

  const handleDeleteRubrica = (index) => {
    handleFieldChange(
      "rubricas",
      data.rubricas.filter((_, i) => i !== index)
    );
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <textarea
        className={`${FormStyle.form_input}`}
        placeholder="Descripción de RAP"
        value={data.descripcion}
        onChange={(e) => handleFieldChange("descripcion", e.target.value)}
      />
      <input
        className={`${FormStyle.form_input}`}
        type="number"
        placeholder="Ponderación"
        value={data.ponderacion}
        onChange={(e) =>
          handleFieldChange("ponderacion", parseFloat(e.target.value))
        }
      />
      <h2>Rúbricas de Evaluación</h2>
      <fieldset className={FormStyle.fieldSet}>
        <legend className="texto-mayor">Datos de las rúbricas</legend>
        {data.rubricas.map((rubrica, index) => (
          <Rubrica
            key={index}
            data={rubrica}
            onChange={(newRubrica) => handleRubricaChange(index, newRubrica)}
            onDelete={() => handleDeleteRubrica(index)}
          />
        ))}
      </fieldset>
      <button onClick={handleAddRubrica} className={`button-second`}>
        Añadir Rúbrica
      </button>
      <button onClick={onDelete} className={`button-first`}>
        Eliminar Resultado
      </button>
    </div>
  );
}

export default Resultado;
