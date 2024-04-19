import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
    const { userID } = await req.json();
  
    try {
      const result: any = await excuteQuery({
        query: `
          SELECT * FROM contest
          WHERE createdBy = ?
          ORDER BY contestID DESC;
        `,
        values: [userID]
      });
  
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json(error);
    }
  }