import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { searchInput } = await req.json();
  const wildCardSearchInput = `%${searchInput}%`;
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT id, name, email, image, isAdmin FROM user
        WHERE name LIKE ?;
      `,
      values: [wildCardSearchInput],
    });

    if (results.error) throw new Error(results.error);

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}