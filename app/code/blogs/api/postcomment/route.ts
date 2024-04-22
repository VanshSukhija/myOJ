import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { blogID, commentID, id, description, parentComment } = await req.json();
  try {
    const results = await excuteQuery({
      query: `
        INSERT INTO comment (blogID, commentID, id, description, parentComment)
        VALUES (?, ?, ?, ?, ?);
      `,
      values: [blogID, commentID, id, description, parentComment],
    });

    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}