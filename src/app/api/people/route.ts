import { NextRequest, NextResponse } from "next/server";
import { notionService } from "@/lib/services/notionService";

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(req: NextRequest) {
  if (!DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID is not set");
  }

  try {
    const people = await notionService.listPeople(DATABASE_ID);

    if (people && people.length > 0) {
      const targetPerson = people.find((p) => p.name === "Eduarda Vieira");

      if (targetPerson) {
        console.log("🔬 RAIO-X DAS PROPRIEDADES (DADOS BRUTOS DO NOTION):");
        console.log(targetPerson.rawProperties);

        console.log("✅ TESTE DE INTEGRIDADE - REGISTRO 'Eduarda Vieira':");
        console.log("---------------------------------------------------");
        console.log(`👤 Nome: ${targetPerson.name}`);
        console.log(`📊 Status: ${targetPerson.status}`);
        console.log(
          `📱 WhatsApp: ${targetPerson.whatsappLink || "Não informado"}`,
        );
        console.log(
          `📸 Instagram: ${targetPerson.instagramLink || "Não informado"}`,
        );
        console.log("---------------------------------------------------");
      } else {
        console.log(
          "⚠️  TESTE: A pessoa 'Eduarda Vieira' não foi encontrada nos resultados do Notion.",
        );
      }
    } else {
      console.log("⚠️  A busca no Notion não retornou nenhum registro.");
    }

    return NextResponse.json(people);
  } catch (error) {
    console.error("Error fetching people:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to fetch people from Notion",
      },
      { status: 500 },
    );
  }
}
