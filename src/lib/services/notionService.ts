import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../clients/notion";

class NotionService {
  private notion: Client;

  constructor() {
    this.notion = notion;
  }

  public async queryDatabase(databaseId: string) {
    try {
      const response = await this.notion.databases.query({
        database_id: databaseId,
      });
      return response;
    } catch (error) {
      console.error("Error querying Notion:", error);
      throw error;
    }
  }

  public async listPeople(databaseId: string) {
    const response = await this.queryDatabase(databaseId);

    return response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const props = page.properties;

        const nameProp = props["Nome Inteiro"];
        const statusProp = props["Status"];
        const groupsProp = props["Groups"];
        const whatsappProp = props["WhatsApp"];
        const instagramProp = props["Instagram"];

        const name =
          nameProp?.type === "title"
            ? nameProp.title.map((t) => t.plain_text).join("")
            : "No Name";

        const status =
          statusProp?.type === "select"
            ? statusProp.select?.name || "Unknown"
            : "Unknown";

        // Assume groups é uma multi_select
        const groups =
          groupsProp?.type === "multi_select"
            ? groupsProp.multi_select.map((g) => g.name)
            : [];

        const whatsappLink =
          whatsappProp?.type === "url"
            ? whatsappProp.url || undefined
            : undefined;

        const instagramLink =
          instagramProp?.type === "url"
            ? instagramProp.url || undefined
            : undefined;

        return {
          name,
          status,
          groups,
          whatsappLink,
          instagramLink,
        };
      });
  }
}

export const notionService = new NotionService();
