import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ProblemType } from "@utils/types";

// export async function GET() {
//   try {
//     const results = await excuteQuery({
//       query: `
//         SELECT * FROM problem
//         ORDER BY problemID DESC;
//       `,
//     });
//     return NextResponse.json(results);
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }

export async function POST(req: Request) {
  const { page, limit } = await req.json();
  try {
    const results = await excuteQuery({
      query: `
        SELECT * FROM problem
        ORDER BY problemID DESC
        LIMIT ${limit} OFFSET ${(page - 1) * limit};
      `
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}