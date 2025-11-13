// 📁 src/api/reporteApi.js
import axios from "axios";

// 🔹 URL base del backend Spring Boot
const API_URL = "http://localhost:8080/api/reportes";

const reporteApi = {
  // ✅ Obtener reporte general de proyectos
  getReportesProyectos: async () => {
    try {
      const response = await axios.get(`${API_URL}/proyectos`);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener el reporte de proyectos:", error);
      throw error;
    }
  },
};

export default reporteApi;
