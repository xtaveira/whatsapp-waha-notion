import { NextRequest, NextResponse } from "next/server";
import { messageService } from "@/lib/services/messageService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId = "554488208778@c.us", text } = body;

    const result = await messageService.sendMessage(chatId, text);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 },
    );
  }
}
