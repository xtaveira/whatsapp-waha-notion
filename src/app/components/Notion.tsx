"use client";

import { useState } from "react";
import { messageService } from "../services/message";
import { notionService } from "../services/notion";

export function Notion() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setStatus("");

    try {
      const message = `notion - ${new Date().toLocaleTimeString()}`;
      await notionService.getDatabaseInfo("asdiasd");
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
        {loading ? "Enviando..." : "NOTION"}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
