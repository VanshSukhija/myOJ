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
  const { problemID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT * FROM problem
        WHERE problemID = ${problemID}
        INNER JOIN testcase ON problem.problemID = testcase.problemID;
      `
    });

    const data: ProblemType = {
      id: results[0].problemID,
      name: results[0].name,
      description: results[0].description,
      inputFormat: results[0].inputFormat,
      outputFormat: results[0].outputFormat,
      constraints: results[0].constraints,
      timeLimit: results[0].timeLimit,
      memoryLimit: results[0].memoryLimit,
      difficulty: results[0].difficulty,
      tags: results[0].tags,
      testcases: results.map((result: any) => ({
        id: result.testcaseID,
        input: result.input,
        expectedOutput: result.expectedOutput
      })),
      note: results[0].note,
      tutorial: results[0].tutorial,
      solution: results[0].solution,
      createdBy: results[0].createdBy
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}