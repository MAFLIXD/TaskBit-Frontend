import React, { useState, useEffect } from "react";
import { enviarMensaje } from "../api/chatApi";
import useSpeechToText from "../hooks/useSpeechToText";

//Importar iconos
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaPaperPlane,
  FaExclamationTriangle 
} from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';

export default function ChatPanel({ temaOscuro = false }) {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  
  // Usa hook de reconocimiento de voz
  const {
    transcript,
    isListening,
    hasRecognitionSupport,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechToText();

  // Efecto para actualizar el mensaje cuando hay nuevo transcript
  useEffect(() => {
    if (transcript) {
      setMensaje(transcript);
    }
  }, [transcript]);

  const handleSend = async () => {
    if (!mensaje.trim()) return;

    setCargando(true);
    try {
      const res = await enviarMensaje(mensaje);
      setRespuesta(res || "No se recibió respuesta del servidor.");
      resetTranscript(); // Limpia el transcript después de enviar
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setRespuesta("❌ Error al conectar con el chat. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
      setMensaje("");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      resetTranscript();
    }
  };

  const bgInput = temaOscuro ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300";
  const bgBoton = temaOscuro ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700";
  const bgBotonVoz = temaOscuro ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700";
  const bgRespuesta = temaOscuro ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";

  return (
    <div className={`p-4 rounded transition-colors duration-300 ${temaOscuro ? "bg-gray-800" : "bg-gray-50"}`}>
      {/* 🔹 Título con icono */}
      <h2 className={`text-xl font-semibold mb-4 flex items-center ${temaOscuro ? "text-white" : "text-gray-800"}`}>
        <BsChatDots className="mr-2" />
        Chat Inteligente
      </h2>

      {/* Área del input con botón de voz */}
      <div className="mb-4">
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje o usa el comando de voz..."
          className={`w-full p-3 border rounded transition-colors duration-300 ${bgInput}`}
          rows={4}
        />
        
        {/* Indicador de grabación */}
        {isListening && (
          <div className="flex items-center mt-2 text-red-500">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm">Habla ahora, te escucho...</span>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-3">
        {/* 🔹 Botón de enviar con icono */}
        <button
          onClick={handleSend}
          disabled={cargando || !mensaje.trim()}
          className={`flex-1 p-3 rounded text-white transition-colors duration-300 flex items-center justify-center ${
            cargando || !mensaje.trim()
              ? (temaOscuro ? "bg-gray-600" : "bg-gray-400") 
              : bgBoton
          }`}
        >
          {cargando ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4 mr-2" />
              Enviar mensaje
            </>
          )}
        </button>

        {/* 🔹 Botón de voz con iconos */}
        {hasRecognitionSupport && (
          <button
            onClick={toggleListening}
            disabled={cargando}
            className={`p-3 rounded text-white transition-colors duration-300 flex items-center justify-center ${
              isListening 
                ? "bg-red-600 hover:bg-red-700" 
                : cargando
                  ? (temaOscuro ? "bg-gray-600" : "bg-gray-400")
                  : bgBotonVoz
            }`}
            title={isListening ? "Detener grabación" : "Iniciar grabación de voz"}
          >
            {isListening ? (
              <FaMicrophoneSlash className="w-5 h-5" />
            ) : (
              <FaMicrophone className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* 🔹 Mensaje de soporte de voz con icono */}
      {!hasRecognitionSupport && (
        <p className={`text-sm mt-2 flex items-center ${temaOscuro ? "text-yellow-400" : "text-yellow-600"}`}>
          <FaExclamationTriangle className="w-4 h-4 mr-2" />
          Tu navegador no soporta reconocimiento de voz.
        </p>
      )}

      {respuesta && (
        <div className={`mt-4 p-4 rounded shadow-sm transition-colors duration-300 ${bgRespuesta}`}>
          <strong className={`flex items-center ${temaOscuro ? "text-blue-400" : "text-blue-600"}`}>
            <BsChatDots className="w-4 h-4 mr-2" />
            Respuesta:
          </strong>
          <p className="mt-2">{respuesta}</p>
        </div>
      )}
    </div>
  );
}