import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT problem.problemID, problem.contestID, problem.problemName, problem.difficulty, problem.tags, temp.minimumVerdict, temp.acceptedSubmissions FROM problem
        LEFT JOIN (
          SELECT MIN(submission.verdict) AS minimumVerdict, problem.problemID, COUNT(DISTINCT id) AS acceptedSubmissions FROM submission
          RIGHT JOIN problem ON submission.problemID = problem.problemID
          WHERE submission.id = ?
          GROUP BY problem.problemID
          HAVING MIN(submission.verdict) = 0
        ) AS temp ON temp.problemID = problem.problemID
        ORDER BY problem.problemID DESC;
      `,
      values: [userID],
    });

    return NextResponse.json(results.map((result: any) => {
      return {
        problemID: result.problemID,
        contestID: result.contestID,
        problemName: result.problemName,
        difficulty: result.difficulty === 'EASY' ? 0 : result.difficulty === 'MEDIUM' ? 1 : 2,
        tags: result.tags,
        minimumVerdict: result.minimumVerdict,
        acceptedSubmissions: result.acceptedSubmissions
      }
    }));
  } catch (error) {
    return NextResponse.json(error);
  }
}