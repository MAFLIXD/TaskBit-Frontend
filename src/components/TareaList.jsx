// 📁 src/components/TareaList.jsx
import React from "react";

export default function TareaList({ tareas = [], mostrarHoras = false, temaOscuro = false }) {
  if (!tareas || tareas.length === 0) {
    return <p className={`text-sm ${temaOscuro ? "text-gray-400" : "text-gray-500"}`}>No hay tareas registradas.</p>;
  }

  return (
    <div className="space-y-2">
      {tareas.map((t) => {
        const estado = t.estado?.toLowerCase() || "";
        let colorClase = temaOscuro ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700";
        
        if (estado === "completada") {
          colorClase = temaOscuro ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700";
        } else if (estado === "pendiente") {
          colorClase = temaOscuro ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-700";
        } else if (estado === "en progreso") {
          colorClase = temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700";
        }

        return (
          <div
            key={t.id}
            className={`flex justify-between items-center border rounded-lg p-3 transition ${
              temaOscuro 
                ? "border-gray-700 bg-gray-800 hover:bg-gray-700" 
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className={`font-medium text-sm ${
                  temaOscuro ? "text-blue-400" : "text-blue-700"
                }`}>
                  {t.titulo}
                </span>
                {mostrarHoras && (
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${
                    temaOscuro ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                  }`}>
                    {t.duracionHoras || 0}h
                  </span>
                )}
              </div>
              {t.descripcion && (
                <p className={`text-xs mt-1 line-clamp-2 ${
                  temaOscuro ? "text-gray-400" : "text-gray-500"
                }`}>
                  {t.descripcion}
                </p>
              )}
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${colorClase} ml-2`}>
              {t.estado}
            </span>
          </div>
        );
      })}
    </div>
  );
}