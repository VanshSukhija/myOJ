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
      const res: any = await excuteQuery({
        query: `
          SELECT * FROM problem
          ORDER BY problemID DESC, testID ASC;
          OFFSET ? LIMIT ?;
          INNER JOIN test ON problem.problemID = test.problemID;
        `,
        values: [limit * (page - 1), limit]
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
          tutorial: problem.tutorial,
          solution: problem.solution,
          createdBy: problem.createdBy,
          solutionLanguage: problem.solutionLanguage,
        }
  
        if (!problemsArray.length || problemsArray[problemsArray.length - 1].problemID !== newProb.problemID) {
          problemsArray.push(newProb);
        } else {
          problemsArray[problemsArray.length - 1].testcases.push(newProb.testcases[0])
        }
      })
  
      return NextResponse.json(problemsArray);
    } catch (error) {
      return NextResponse.json(error);
    }
  }