import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { blogID } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        SELECT * FROM blog
        WHERE blogID = ?;
      `,
      values: [blogID]
    });
    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}