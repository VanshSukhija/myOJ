import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { contestID, userID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
        INSERT INTO party (contestID, id)
        VALUES (?, ?);
      `,
      values: [contestID, userID]
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req: Request) {
  const { contestID, userID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
        DELETE FROM party
        WHERE contestID = ? AND id = ?;
      `,
      values: [contestID, userID]
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}