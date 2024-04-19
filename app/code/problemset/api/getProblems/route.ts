import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT 
          problem.problemID,
          problem.contestID,
          problem.problemName,
          problem.difficulty,
          problem.tags,
          temp1.minimumVerdict,
          temp2.acceptedSubmissions
        FROM problem
        INNER JOIN contest ON contest.contestID = problem.contestID
        LEFT JOIN (
          SELECT 
            MIN(verdict) AS minimumVerdict,
            submission.problemID 
          FROM submission
          WHERE submission.id = ?
          GROUP BY submission.problemID
        ) AS temp1 ON temp1.problemID = problem.problemID
        LEFT JOIN (
          SELECT 
            COUNT(DISTINCT id) AS acceptedSubmissions,
            submission.problemID
          FROM submission
          WHERE submission.verdict = 0
          GROUP BY submission.problemID
        ) AS temp2 ON temp2.problemID = problem.problemID
        WHERE contest.endtime <= ADDTIME(CURRENT_TIMESTAMP(), '05:30:00')
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