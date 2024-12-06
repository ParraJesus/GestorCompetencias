import React, { forwardRef } from "react";

const PrintableReport = forwardRef(({ informData }, ref) => {
  return (
    <div ref={ref}>
      <h1>Informe Generado</h1>
      {informData.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Grupo</th>
              <th>Profesor</th>
              <th>Evaluador</th>
              <th>Cantidad de Estudiantes</th>
            </tr>
          </thead>
          <tbody>
            {informData.map((item, index) => (
              <tr key={index}>
                <td>{item.NombreAsignatura}</td>
                <td>{item.Grupo}</td>
                <td>{`${item.NombreProfesor} ${item.ApellidoProfesor}`}</td>
                <td>{`${item.NombreEvaluador} ${item.ApellidoEvaluador}`}</td>
                <td>{item.CantidadEstudiantes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay información disponible para mostrar.</p>
      )}
    </div>
  );
});

export default PrintableReport;
