import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { blogID, commentID, id, hasLiked } = await req.json();
  try {
    const results = await excuteQuery({
      query: `
        INSERT INTO action (blogID, commentID, id, hasLiked)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          hasLiked = VALUES(hasLiked)
        ;
      `,
      values: [blogID, commentID, id, hasLiked],
    });

    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}

export async function DELETE(req: Request) {
  const { blogID, commentID, id } = await req.json();
  try {
    const results = await excuteQuery({
      query: `
        DELETE FROM action
        WHERE blogID = ? AND commentID = ? AND id = ?;
      `,
      values: [blogID, commentID, id],
    });

    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}