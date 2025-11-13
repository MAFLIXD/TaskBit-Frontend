import React from "react";
import ProyectoList from "../components/ProyectoList";
import ReportePanel from "../components/ReportePanel";
import ChatPanel from "../components/ChatPanel";

export default function BitacoraPage() {
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Bitácora de Tareas</h1>
      <ProyectoList />
      <ReportePanel />
      <ChatPanel />
    </div>
  );
}
