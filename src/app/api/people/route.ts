import { NextRequest, NextResponse } from "next/server";
import { notionService } from "@/lib/services/notionService";

const DATABASE_ID = "1fd974a372fd804fa1add9bdcca40405";

export async function GET(req: NextRequest) {
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
