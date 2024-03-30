import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { DisplayProblemType } from "@utils/types";

export async function POST(req: Request) {
  const { problemID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT problem.*, contest.contestName, user.name AS username FROM problem
        INNER JOIN contest ON contest.contestID = problem.contestID
        INNER JOIN user ON user.id = problem.createdBy
        WHERE problem.problemID = ?;

        SELECT testID, input, expectedOutput FROM test
        WHERE problemID = ?;
      `,
      values: [problemID, problemID],
    });

    if(!results[0].length){
      return NextResponse.json({
        status: 'error',
        message: 'Problem not found'
      });
    }

    const problem: DisplayProblemType = {
      problemID: results[0][0].problemID,
      contestID: results[0][0].contestID,
      contestName: results[0][0].contestName,
      problemName: results[0][0].problemName,
      problemDescription: results[0][0].problemDescription,
      inputFormat: results[0][0].inputFormat,
      outputFormat: results[0][0].outputFormat,
      constraints: results[0][0].constraints,
      timeLimit: results[0][0].timeLimit,
      memoryLimit: results[0][0].memoryLimit,
      difficulty: results[0][0].difficulty === 'EASY' ? 0 : results[0][0].difficulty === 'MEDIUM' ? 1 : 2,
      tags: results[0][0].tags,
      testcases: results[1].map((result: any) => {
        return {
          id: result.testID,
          input: result.input,
          expectedOutput: result.expectedOutput
        }
      }),
      note: results[0][0].note,
      tutorial: results[0][0].tutorial,
      solution: results[0][0].solution,
      createdBy: results[0][0].createdBy,
      solutionLanguage: results[0][0].solutionLanguage,
      checkerCode: results[0][0].checkerCode,
      checkerLanguage: results[0][0].checkerLanguage,
      username: results[0][0].username
    }

    return NextResponse.json({
      status: 'success',
      data: problem
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error
    });
  }
}