// 📁 src/api/tareaApi.js
import axios from "axios";

// 🔹 URL base del backend Spring Boot
const API_URL = "http://localhost:8080/api/tareas";

const tareaApi = {
  // ✅ Obtener todas las tareas
  getTareas: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // ✅ Obtener tarea por ID
  getTareaPorId: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // ✅ Crear nueva tarea
  crearTarea: async (tarea) => {
    const response = await axios.post(API_URL, tarea);
    return response.data;
  },

  // ✅ Actualizar tarea existente
  actualizarTarea: async (id, tarea) => {
    const response = await axios.put(`${API_URL}/${id}`, tarea);
    return response.data;
  },

  // ✅ Eliminar tarea
  eliminarTarea: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

// 🔹 Exportación por defecto (para que funcione el import en App.jsx)
export default tareaApi;
