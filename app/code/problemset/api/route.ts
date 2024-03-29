import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ProblemType } from "@utils/types";

export async function GET() {
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT problemID, contestID, problemName, difficulty, tags FROM problem
        ORDER BY problem.problemID DESC;
      `,
    });

    return NextResponse.json(results.map((result: any) => {
      return {
        problemID: result.problemID,
        contestID: result.contestID,
        problemName: result.problemName,
        difficulty: result.difficulty=== 'EASY' ? 0 : result.difficulty === 'MEDIUM' ? 1 : 2,
        tags: result.tags
      }
    }));
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  const { problemID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        select * from problem
        inner join test on test.problemID = problem.problemID
        order by problem.problemID desc, test.testID asc
        where problem.problemID = ?;
      `,
      values: [problemID],
    });

    const problem: ProblemType = {
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
      }),
      note: results[0].note,
      tutorial: results[0].tutorial,
      solution: results[0].solution,
      createdBy: results[0].createdBy,
      solutionLanguage: results[0].solutionLanguage,
      checkerCode: results[0].checkerCode,
      checkerLanguage: results[0].checkerLanguage
    }

    return NextResponse.json(problem);
  } catch (error) {
    return NextResponse.json(error);
  }
}