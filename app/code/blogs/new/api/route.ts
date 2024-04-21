import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { blogID, title, content, createdBy } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        INSERT INTO blog (
          blogID, title, content, createdBy
        )
        VALUES (
          ?, ?, ?, ?
        )
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          content = VALUES(content)
        ;
      `,
      values: [blogID, title, content, createdBy]
    });
    return NextResponse.json({ results, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}

export async function DELETE(req: Request) {
  const { table, column, id } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        DELETE FROM ${table} WHERE ${column} = ${id};
      `,
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}