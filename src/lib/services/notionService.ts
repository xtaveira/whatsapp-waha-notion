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

    const customTypeOrder = [
      "ganhando",
      "discípulo",
      "ovelha 99",
      "consolidar",
      "ganhar",
      "oração",
      "ovelha 1",
    ];

    const people = response.results
      .filter((page): page is PageObjectResponse => "properties" in page)
      .map((page) => {
        const props = page.properties;

        const typeProp = props["Tipo"];
        const type =
          typeProp?.type === "select" ? typeProp.select?.name || "N/A" : "N/A";

        const nameProp = props["Nome Inteiro"];
        const name =
          nameProp?.type === "title"
            ? nameProp.title.map((t) => t.plain_text).join("")
            : "No Name";

        const statusProp = props["Situação"];
        const status =
          statusProp?.type === "select"
            ? statusProp.select?.name || "Unknown"
            : "Unknown";

        const whatsappProp = props["Whatsapp"];
        const whatsappLink =
          whatsappProp?.type === "url"
            ? whatsappProp.url || undefined
            : undefined;

        const instagramProp = props["Instagram"];
        const instagramLink =
          instagramProp?.type === "url"
            ? instagramProp.url || undefined
            : undefined;

        const messageNameProp = props["MessageName"];
        const rawMessageName =
          messageNameProp?.type === "rich_text"
            ? messageNameProp.rich_text.map((t) => t.plain_text).join("")
            : undefined;
        const messageName =
          rawMessageName && rawMessageName.trim()
            ? rawMessageName
            : name.split(" ")[0];

        return {
          type,
          name,
          status,
          whatsappLink,
          instagramLink,
          messageName,
        };
      });

    people.sort((a, b) => {
      const rankA = customTypeOrder.indexOf(a.type);
      const rankB = customTypeOrder.indexOf(b.type);

      if (rankA !== rankB) {
        if (rankA === -1) return 1;
        if (rankB === -1) return -1;
        return rankA - rankB;
      }

      return a.name.localeCompare(b.name);
    });

    return people;
  }
}

export const notionService = new NotionService();
