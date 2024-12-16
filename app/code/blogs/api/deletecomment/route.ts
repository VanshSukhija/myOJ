import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function DELETE(req: Request) {
  const { blogID, userID, commentID } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        DELETE FROM comment
        WHERE blogID = ? AND id = ? AND commentID = ?;
      `,
      values: [blogID, userID, commentID]
    });
    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}