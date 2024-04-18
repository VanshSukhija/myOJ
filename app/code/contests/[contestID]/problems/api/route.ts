import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { contestID, userID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
        SELECT * FROM contest
        WHERE contestID = ?;

        SELECT 
          problem.problemID,
          problem.contestID,
          problem.problemName,
          problem.difficulty,
          problem.tags,
          temp1.minimumVerdict,
          temp2.acceptedSubmissions
        FROM problem
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
          WHERE submission.verdict = 0 AND submission.id IN (
            SELECT id FROM party
            WHERE contestID = ?
          )
          GROUP BY submission.problemID
        ) AS temp2 ON temp2.problemID = problem.problemID
        WHERE contestID = ?
        ORDER BY temp2.acceptedSubmissions DESC, problem.problemID ASC;

        SELECT user.id, user.name, user.email, user.image, user.isAdmin FROM party
        INNER JOIN user ON user.id = party.id
        WHERE contestID = ?
        ORDER BY user.name ASC;
      `,
      values: [contestID, userID, contestID, contestID, contestID]
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
      }),
      participants: result[2]
    });
  } catch (error) {
    return NextResponse.json({status: "error", error});
  }
}