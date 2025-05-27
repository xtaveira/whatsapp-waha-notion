import { Client } from "@notionhq/client";

class NotionService {
  private notion;

  constructor() {
    this.notion = new Client({
      auth:
        process.env.NOTION_TOKEN ||
        "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", // seu token no env
    });
  }

  public async queryDatabase(databaseId: string) {
    try {
      const response = await this.notion.databases.query({
        database_id: "1fd974a372fd804fa1add9bdcca40405",
      });
      console.log("Dados do database:", response);
      return response;
    } catch (error) {
      console.error("Erro ao consultar Notion:", error);
      throw error;
    }
  }
}

export const notionService = new NotionService();
