import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function DELETE(req: Request) {
  const { blogID, userID } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        DELETE FROM blog
        WHERE blogID = ? AND createdBy = ?;
      `,
      values: [blogID, userID]
    });
    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}