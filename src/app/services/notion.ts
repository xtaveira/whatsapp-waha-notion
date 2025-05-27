export const notionService = {
  async getDatabaseInfo(databaseId: string) {
    const url = `/api/notion?databaseId=${encodeURIComponent(databaseId)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Opcional no GET, mas ok manter
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar informações do Notion");
    }

    return await res.json();
  },
};
