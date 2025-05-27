"use client";

import { useState } from "react";
import { messageService } from "../services/message";

export function SendMessage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus("");

    try {
      const message = `Mensagem com WAHA - ${new Date().toLocaleTimeString()}`;
      await messageService.sendMessage(message);
      setStatus("Mensagem enviada com sucesso!");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Enviando..." : "Enviar mensagem"}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
