// 📁 src/api/chatApi.js
import axios from "axios";

// 🔹 URL base del backend Spring Boot
const API_URL = "http://localhost:8080/api/chat";

// ✅ Enviar un mensaje al backend y recibir la respuesta
export const enviarMensaje = async (mensaje) => {
  try {
    const response = await axios.post(API_URL, mensaje, {
      headers: { "Content-Type": "text/plain" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar mensaje al chat:", error);
    throw error;
  }
};
