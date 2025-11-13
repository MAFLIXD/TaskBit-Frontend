// 📁 src/api/proyectoApi.js
import axios from "axios";

// 🔹 URL base del backend Spring Boot
const API_URL = "http://localhost:8080/api/proyectos";

const proyectoApi = {
  // ✅ Obtener todos los proyectos
  getProyectos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener proyectos:", error);
      throw error;
    }
  },

  // ✅ Obtener un proyecto por ID
  getProyectoPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener proyecto:", error);
      throw error;
    }
  },

  // ✅ Crear un nuevo proyecto
  crearProyecto: async (proyecto) => {
    try {
      const response = await axios.post(API_URL, proyecto);
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear proyecto:", error);
      throw error;
    }
  },

  // ✅ Actualizar un proyecto existente
  actualizarProyecto: async (id, proyecto) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, proyecto);
      return response.data;
    } catch (error) {
      console.error("❌ Error al actualizar proyecto:", error);
      throw error;
    }
  },

  // ✅ Eliminar un proyecto
  eliminarProyecto: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("❌ Error al eliminar proyecto:", error);
      throw error;
    }
  },
};

// 🔸 Exportación por defecto
export default proyectoApi;
