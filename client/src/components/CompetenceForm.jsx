import React, { useState } from "react";
import Resultado from "./ResultadoForm";

import FormStyle from "../stylesheets/Form.module.css";

export function Competencia({ data, onChange, onDelete }) {
  const handleFieldChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre de competencia"
        value={data.nombre}
        onChange={(e) => handleFieldChange("nombre", e.target.value)}
      />
      <input
        type="number"
        placeholder="Ponderación"
        value={data.ponderacion}
        onChange={(e) =>
          handleFieldChange("ponderacion", parseFloat(e.target.value))
        }
      />
      <textarea
        placeholder="Descripción"
        value={data.descripcion}
        onChange={(e) => handleFieldChange("descripcion", e.target.value)}
      />
      {/* Manejo de Resultados */}
      {data.resultados.map((resultado, index) => (
        <Resultado
          key={index}
          data={resultado}
          onChange={(newResultado) => {
            const newResultados = [...data.resultados];
            newResultados[index] = newResultado;
            handleFieldChange("resultados", newResultados);
          }}
          onDelete={() => {
            const newResultados = data.resultados.filter((_, i) => i !== index);
            handleFieldChange("resultados", newResultados);
          }}
        />
      ))}
      <button
        onClick={() =>
          handleFieldChange("resultados", [
            ...data.resultados,
            { descripcion: "", ponderacion: 0, rubricas: [] },
          ])
        }
      >
        Añadir Resultado de Aprendizaje
      </button>
      <button onClick={onDelete}>Eliminar Competencia</button>
    </div>
  );
}

export default Competencia;
