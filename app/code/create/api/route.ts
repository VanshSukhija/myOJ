import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ContestType } from "@utils/types";

export async function GET() {
  try {
    const results = await excuteQuery({
      query: `
        SELECT * FROM contest;
      `,
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  // const contest: ContestType = body;
  console.log(body);
  try {
    const results = await excuteQuery({
      query: `
        SHOW TABLES;
      `
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}