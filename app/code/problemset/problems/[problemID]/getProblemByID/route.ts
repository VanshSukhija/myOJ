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
        INNER JOIN test ON problem.problemID = test.problemID;
      `
    });

    const data: ProblemType = {
      problemID: results[0].problemID,
      contestID: results[0].contestID,
      problemName: results[0].problemName,
      problemDescription: results[0].problemDescription,
      inputFormat: results[0].inputFormat,
      outputFormat: results[0].outputFormat,
      constraints: results[0].constraints,
      timeLimit: results[0].timeLimit,
      memoryLimit: results[0].memoryLimit,
      difficulty: results[0].difficulty === 'EASY' ? 0 : results[0].difficulty === 'MEDIUM' ? 1 : 2,
      tags: results[0].tags,
      testcases: results.map((result: any) => {
        return {
          id: result.testID,
          input: result.input,
          expectedOutput: result.expectedOutput
        }
      }).sort((a: any, b: any) => a.id - b.id),
      note: results[0].note,
      tutorial: results[0].tutorial,
      solution: results[0].solution,
      createdBy: results[0].createdBy,
      solutionLanguage: results[0].solutionLanguage,
      checkerCode: results[0].checkerCode,
      checkerLanguage: results[0].checkerLanguage
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}