export const messageService = {
  async sendMessage(text: string) {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: "554488208778@c.us",
        text,
      }),
    });

    if (!res.ok) {
      throw new Error("Erro ao enviar mensagem");
    }

    return await res.json();
  },
};
