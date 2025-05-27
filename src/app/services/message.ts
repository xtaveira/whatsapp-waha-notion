const baseUrl = process.env.WAHA_URL || "http://localhost:3001/api";
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: "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",
});
class MessageService {
  public async sendMessage(message: string) {
    try {
      const res = await fetch(`${baseUrl}/sendText`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: "554488208778@c.us",
          text: message,
          session: "default",
        }),
      });

      return res.json();
    } catch (error: any) {
      console.error("Error sending message:", error);
    }
  }

  public async notionTest() {
    return await notion.users.list({});
  }
}

export const messageService = new MessageService();
