"use client";
import { useEffect, useState } from "react";
import { messageService } from "../services/message";

export function SendMessage() {
  const handleClick = () => {
    const message = `Message with Waha ${new Date()}`;
    messageService.sendMessage(message);
  };

  return (
    <div
      className="cursor-pointer p-2 bg-gray-100 border border-gray-300 rounded"
      onClick={handleClick}
    >
      enviar mensagem
    </div>
  );
}
