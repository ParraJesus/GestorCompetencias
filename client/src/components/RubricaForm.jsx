import React from "react";

import FormStyle from "../stylesheets/Form.module.css";

function Rubrica({ data, onChange, onDelete }) {
  const handleFieldChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div style={{ marginLeft: "40px" }}>
      <textarea
        className={`${FormStyle.form_input}`}
        placeholder="Descripción"
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
      <button onClick={onDelete} className={`button-first`}>
        Eliminar Rúbrica
      </button>
    </div>
  );
}

export default Rubrica;
