import { NextRequest, NextResponse } from "next/server";
import { notionService } from "@/lib/services/notionService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const databaseId = searchParams.get("databaseId");

    if (!databaseId) {
      return NextResponse.json(
        { error: "Parâmetro 'databaseId' é obrigatório" },
        { status: 400 },
      );
    }

    const result = await notionService.queryDatabase(databaseId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao consultar Notion:", error);
    return NextResponse.json(
      { error: "Erro ao consultar Notion" },
      { status: 500 },
    );
  }
}
