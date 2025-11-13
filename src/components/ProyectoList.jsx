import React, { useEffect, useState } from "react";
import { getProyectos } from "../api/proyectoApi";
import TareaList from "./TareaList";

export default function ProyectoList() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    getProyectos().then(setProyectos);
  }, []);

  return (
    <div className="p-4">
      <h2>📋 Proyectos</h2>
      {proyectos.map((p) => (
        <div key={p.id} className="border rounded p-3 my-2 bg-gray-50">
          <h3>{p.nombre}</h3>
          <p>Duración: {p.duracionHoras} horas</p>
          <TareaList idProyecto={p.id} />
        </div>
      ))}
    </div>
  );
}
