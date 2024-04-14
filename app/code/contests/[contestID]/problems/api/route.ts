import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { contestID, userID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
        SELECT * FROM contest
        WHERE contestID = ?;

        SELECT problem.problemID, problem.contestID, problem.problemName, problem.difficulty, problem.tags, temp.minimumVerdict, temp.acceptedSubmissions FROM problem
        LEFT JOIN (
          SELECT MIN(submission.verdict) AS minimumVerdict, problem.problemID, COUNT(DISTINCT id) AS acceptedSubmissions FROM submission
          RIGHT JOIN problem ON submission.problemID = problem.problemID
          WHERE submission.id = ?
          GROUP BY problem.problemID
          HAVING MIN(submission.verdict) = 0
        ) AS temp ON temp.problemID = problem.problemID
        WHERE problem.contestID = ?
        ORDER BY temp.acceptedSubmissions DESC, problem.problemID ASC;
      `,
      values: [contestID, userID, contestID]
    });

    return NextResponse.json({
      status: "success",
      contestDetails: result[0].length > 0 ? result[0][0] : null,
      problems: result[1].map((problem: any) => {
        return {
          problemID: problem.problemID,
          contestID: problem.contestID,
          problemName: problem.problemName,
          difficulty: problem.difficulty === 'EASY' ? 0 : problem.difficulty === 'MEDIUM' ? 1 : 2,
          tags: problem.tags,
          minimumVerdict: problem.minimumVerdict,
          acceptedSubmissions: problem.acceptedSubmissions
        }
      })
    });
  } catch (error) {
    return NextResponse.json({status: "error", error});
  }
}