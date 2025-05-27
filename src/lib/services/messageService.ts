import { baseUrl } from "../config";

class MessageService {
  public async sendMessage(chatId: string, text: string) {
    try {
      const res = await fetch(`${baseUrl}/sendText`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          text,
          session: "default",
        }),
      });

      if (!res.ok) {
        throw new Error("WAHA API error");
      }

      return await res.json();
    } catch (error) {
      console.error("Error sending message to WAHA:", error);
      throw error;
    }
  }
}

export const messageService = new MessageService();
