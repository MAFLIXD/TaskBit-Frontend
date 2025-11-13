import React, { useEffect, useState } from "react";
import proyectoApi from "./api/proyectoApi";
import tareaApi from "./api/tareaApi";
import reporteApi from "./api/reporteApi";
import ChatPanel from "./components/ChatPanel";
import TareaList from "./components/TareaList";
//Importar iconos
import { 
  FaFolder, 
  FaTasks, 
  FaChartBar, 
  FaSun, 
  FaMoon,
  FaHome 
} from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { BsXDiamond } from "react-icons/bs";

export default function App() {
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [vistaActiva, setVistaActiva] = useState("proyectos");
  const [temaOscuro, setTemaOscuro] = useState(false);

  //Calcular horas totales de tareas
  const calcularHorasTareas = (tareasLista) => {
    return tareasLista.reduce((total, tarea) => total + (tarea.duracionHoras || 0), 0);
  };

  //Calcular horas totales de proyectos
  const calcularHorasProyectos = (proyectosLista) => {
    return proyectosLista.reduce((total, proyecto) => {
      const horasProyecto = proyecto.duracionHoras || 0;
      const horasTareas = calcularHorasTareas(proyecto.tareas || []);
      return total + horasProyecto + horasTareas;
    }, 0);
  };

  //Calcular horas totales de reportes
  const calcularHorasReportes = (reportesLista) => {
    return reportesLista.reduce((total, reporte) => total + (reporte.horasTotales || 0), 0);
  };

  //Cargar datos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proyectosData = await proyectoApi.getProyectos();
        const tareasData = await tareaApi.getTareas();
        const reportesData = await reporteApi.getReportesProyectos();
        setProyectos(proyectosData);
        setTareas(tareasData);
        setReportes(reportesData);
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  // 🔹 Calcular estadísticas
  const horasTotalesProyectos = calcularHorasProyectos(proyectos);
  const horasTotalesTareas = calcularHorasTareas(tareas);
  const horasTotalesReportes = calcularHorasReportes(reportes);

  // 🔹 Clases CSS condicionales para el tema
  const bgPrincipal = temaOscuro ? "bg-gray-900" : "bg-gray-50";
  const bgSecundario = temaOscuro ? "bg-gray-800" : "bg-white";
  const bgTerciario = temaOscuro ? "bg-gray-700" : "bg-gray-100";
  const textPrincipal = temaOscuro ? "text-gray-100" : "text-gray-800";
  const textSecundario = temaOscuro ? "text-gray-300" : "text-gray-600";
  const borderColor = temaOscuro ? "border-gray-700" : "border-gray-200";
  const hoverCard = temaOscuro ? "hover:bg-gray-700" : "hover:shadow-md";

  return (
    <div className={`min-h-screen ${bgPrincipal} ${textPrincipal} flex transition-colors duration-300`}>
      {/* 🔹 Panel lateral derecho */}
      <div className={`w-115 ${bgSecundario} border-l ${borderColor} h-screen overflow-y-auto sticky top-0 transition-colors duration-300`}>
        <div className={`p-4 border-b ${borderColor}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Navegación</h2>
            {/* 🔹 Toggle del tema - ICONOS */}
            <button
              onClick={() => setTemaOscuro(!temaOscuro)}
              className={`p-3 rounded-lg transition-all duration-300 mt-4 ${
                temaOscuro 
                  ? "bg-cyan-50 text-gray-900 hover:bg-cyan-900" 
                  : "bg-blue-950 text-white hover:bg-cyan-900"
              }`}
              title={temaOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            >
              {temaOscuro ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* 🔹 Selector de vista - ICONOS */}
        <div className={`p-4 border-b ${borderColor}`}>
          <div className={`flex flex-col mt-2 mb-3 space-y-4 ${bgTerciario} rounded-lg p-1 transition-colors duration-300`}>
            <button
              onClick={() => setVistaActiva("proyectos")}
              className={`py-2 px-3 rounded-md text-sm font-medium transition flex items-center ${
                vistaActiva === "proyectos" 
                  ? `${bgSecundario} shadow-sm text-blue-500` 
                  : `${textSecundario} hover:text-blue-400`
              }`}
            >
              <FaFolder className="w-4 h-4 mr-2" />
              Proyectos
            </button>
            <button
              onClick={() => setVistaActiva("tareas")}
              className={`py-2 px-3 rounded-md text-sm font-medium transition flex items-center ${
                vistaActiva === "tareas" 
                  ? `${bgSecundario} shadow-sm text-blue-500` 
                  : `${textSecundario} hover:text-blue-400`
              }`}
            >
              <FaTasks className="w-4 h-4 mr-2" />
              Tareas
            </button>
            <button
              onClick={() => setVistaActiva("reportes")}
              className={`py-2 px-3 rounded-md text-sm font-medium transition flex items-center ${
                vistaActiva === "reportes" 
                  ? `${bgSecundario} shadow-sm text-blue-500` 
                  : `${textSecundario} hover:text-blue-400`
              }`}
            >
              <FaChartBar className="w-4 h-4 mr-2" />
              Reportes
            </button>
          </div>
        </div>

        {/* 🔹 Contenido del panel lateral */}
        <div className="p-3">
          {vistaActiva === "proyectos" ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-semibold flex items-center">
                  <FaFolder className="w-4 h-4 mr-2" />
                  Proyectos Activos
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"
                }`}>
                  {horasTotalesProyectos}h totales
                </span>
              </div>
              {proyectos.length === 0 ? (
                <p className={`text-sm ${textSecundario}`}>No hay proyectos registrados.</p>
              ) : (
                <div className="space-y-3">
                  {proyectos.map((proyecto) => {
                    const horasProyecto = proyecto.duracionHoras || 0;
                    const horasTareasProyecto = calcularHorasTareas(proyecto.tareas || []);
                    const horasTotalesProyecto = horasProyecto + horasTareasProyecto;

                    return (
                      <div
                        key={proyecto.id}
                        className={`border ${borderColor} rounded-lg p-3 ${hoverCard} transition cursor-pointer ${bgSecundario}`}
                      >
                        <h4 className="font-medium text-blue-400 text-sm flex items-center">
                          <FaFolder className="w-3 h-3 mr-1" />
                          {proyecto.nombre}
                        </h4>
                        <p className={`text-xs ${textSecundario} mt-1 line-clamp-2`}>
                          {proyecto.descripcion}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-xs ${textSecundario}`}>
                            {proyecto.tareas?.length || 0} tareas
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            temaOscuro ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                          }`}>
                            {horasTotalesProyecto}h
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            proyecto.estado === "COMPLETADO" 
                              ? temaOscuro ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700"
                              : temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"
                          }`}>
                            {proyecto.estado}
                          </span>
                          <span className={`text-xs ${textSecundario}`}>
                            {horasProyecto}h proyecto + {horasTareasProyecto}h tareas
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : vistaActiva === "tareas" ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-semibold flex items-center">
                  <FaTasks className="w-4 h-4 mr-2" />
                  Todas las Tareas
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"
                }`}>
                  {horasTotalesTareas}h totales
                </span>
              </div>
              <TareaList tareas={tareas} mostrarHoras={true} temaOscuro={temaOscuro} />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-semibold flex items-center">
                  <FaChartBar className="w-4 h-4 mr-2" />
                  Reportes de Progreso
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"
                }`}>
                  {horasTotalesReportes}h totales
                </span>
              </div>
              {reportes.length === 0 ? (
                <p className={`text-sm ${textSecundario}`}>No hay reportes disponibles.</p>
              ) : (
                <div className="space-y-4">
                  {reportes.map((reporte) => {
                    const horasReporte = reporte.horasTotales || 0;
                    const horasCompletadas = horasReporte * (reporte.progreso / 100);
                    
                    return (
                      <div
                        key={reporte.id}
                        className={`border ${borderColor} rounded-lg p-4 ${hoverCard} transition ${bgSecundario}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm flex items-center">
                            <FaChartBar className="w-3 h-3 mr-1" />
                            {reporte.nombre}
                          </h4>
                          <div className="text-right">
                            <span className={`text-xs font-semibold px-2 py-1 rounded block mb-1 ${
                              temaOscuro ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"
                            }`}>
                              {reporte.progreso.toFixed(1)}%
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              temaOscuro ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}>
                              {horasReporte}h
                            </span>
                          </div>
                        </div>
                        
                        {/* Barra de progreso */}
                        <div className={`w-full rounded-full h-2 mb-2 ${
                          temaOscuro ? "bg-gray-700" : "bg-gray-200"
                        }`}>
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${reporte.progreso}%` }}
                          ></div>
                        </div>
                        
                        <div className={`flex justify-between text-xs ${textSecundario}`}>
                          <span>
                            {horasCompletadas.toFixed(1)}h / {horasReporte}h
                          </span>
                          <span>
                            {reporte.tareasCompletadas || 0} / {reporte.totalTareas || 0} tareas
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Área principal centrada - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${bgSecundario} border-b ${borderColor} py-4 px-6 transition-colors duration-300`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-500 flex items-center">
                <BsXDiamond className="w-9" />
                TaskBit — Bitácora de Tareas
              </h1>
              <p className={`text-sm mt-1${textSecundario}`}>
                Gestiona proyectos, tareas y visualiza reportes con IA de forma automatica
              </p>
            </div>
            <div className="text-right">
              <div className={`text-sm ${textSecundario}`}>
                <div className="flex space-x-4">
                  <span>Proyectos: <strong>{proyectos.length}</strong></span>
                  <span>Tareas: <strong>{tareas.length}</strong></span>
                  <span>Horas: <strong>{horasTotalesProyectos}h</strong></span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 🔹 Contenido principal centrado */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center">
                Asistente de Tareas IA
              </h2>
              <p className={`max-w-2xl mx-auto ${textSecundario}`}>
                Escribe instrucciones para gestionar proyectos y tareas o generar reportes automáticamente
              </p>
            </div>
            
            {/* 🔹 Panel del Chat centrado */}
            <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${bgSecundario}`}>
              <ChatPanel temaOscuro={temaOscuro} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}