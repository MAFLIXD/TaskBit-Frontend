import React, { useEffect, useState } from "react";
import { getReportes } from "../api/reporteApi";

export default function ReportePanel() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReportes().then(setReportes);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2>📊 Reporte de Proyectos</h2>
      <ul>
        {reportes.map((r) => (
          <li key={r.id}>
            {r.nombre}: {r.progreso.toFixed(1)}% completado
          </li>
        ))}
      </ul>
    </div>
  );
}
