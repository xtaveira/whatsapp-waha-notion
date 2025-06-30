import { NextRequest, NextResponse } from "next/server";
import { notionService } from "@/lib/services/notionService";

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(req: NextRequest) {
  if (!DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID is not set");
  }

  try {
    const people = await notionService.listPeople(DATABASE_ID);
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
