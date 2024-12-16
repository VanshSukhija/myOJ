import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ContestType, ProblemType } from "@utils/types";

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
  const { contestID } = await req.json();

  try {
    const res: any = await excuteQuery({
      query: `
        SELECT * FROM contest
        INNER JOIN problem ON problem.contestID = contest.contestID
        INNER JOIN test ON test.problemID = problem.problemID
        WHERE contest.contestID = ?
        ORDER BY problem.problemID ASC, test.testID ASC;
      `,
      values: [contestID]
    });

    let problemsArray: ProblemType[] = [];

    res.forEach((problem: any) => {
      let newProb: ProblemType = {
        problemID: problem.problemID,
        contestID: problem.contestID,
        problemName: problem.problemName,
        problemDescription: problem.problemDescription,
        inputFormat: problem.inputFormat,
        outputFormat: problem.outputFormat,
        constraints: problem.constraints,
        timeLimit: problem.timeLimit,
        memoryLimit: problem.memoryLimit,
        difficulty: problem.difficulty === 'EASY' ? 0 : problem.difficulty === 'MEDIUM' ? 1 : 2,
        tags: problem.tags,
        testcases: [
          {
            id: problem.testID,
            input: problem.input,
            expectedOutput: problem.expectedOutput
          }
        ],
        note: problem.note,
        createdBy: problem.createdBy,
      }

      if (!problemsArray.length || problemsArray[problemsArray.length - 1].problemID !== newProb.problemID) {
        problemsArray.push(newProb);
      } else {
        problemsArray[problemsArray.length - 1].testcases.push(newProb.testcases[0])
      }
    })

    const result: ContestType | null = res.length ? {
      contestID: res[0].contestID,
      contestName: res[0].contestName,
      contestDescription: res[0].contestDescription,
      startTime: res[0].startTime,
      endTime: res[0].endTime,
      registrationTime: res[0].registrationTime,
      problems: problemsArray,
      createdBy: res[0].createdBy
    } : null;

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}