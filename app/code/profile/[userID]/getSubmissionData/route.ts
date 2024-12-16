import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT
          DATE(DATE_ADD('1970/1/1', INTERVAL CAST(submissionID AS SIGNED) div 1000 SECOND)) AS submissionDate,
          COUNT(DATE(DATE_ADD('1970/1/1', INTERVAL CAST(submissionID AS SIGNED) div 1000 SECOND))) AS submissionCount
        FROM submission
        WHERE submission.id = ?
        GROUP BY submissionDate;

        SELECT language, COUNT(language) AS submissionCount FROM submission
        WHERE submission.id = ?
        GROUP BY language;

        SELECT verdict, COUNT(verdict) AS submissionCount FROM submission
        WHERE submission.id = ?
        GROUP BY verdict
        ORDER BY verdict;

        SELECT 
          DISTINCT problem.difficulty, 
          COUNT(problem.problemID) AS totalProblems, 
          IFNULL(temp.submissionCount, 0) AS submissionCount 
        FROM problem
        LEFT JOIN (
          SELECT 
            problem.difficulty, 
            COUNT(DISTINCT problem.problemID) AS submissionCount 
          FROM submission
          LEFT JOIN problem ON problem.problemID = submission.problemID
          WHERE submission.id = ? AND verdict = 0
          GROUP BY problem.difficulty
        ) AS temp ON temp.difficulty = problem.difficulty
        GROUP BY problem.difficulty, submissionCount;

        SELECT tags FROM problem
        WHERE
          problemID IN (
            SELECT DISTINCT problemID FROM submission
            WHERE
              id = ? AND
              verdict = 0
          );
      `,
      values: [userID, userID, userID, userID, userID],
    });

    if (results.error) throw new Error(results.error);

    // const results = res[0].map((result: any) => {
    //   return {
    //     submissionDate: new Date(result.submissionDate).toISOString().split('T')[0],
    //     submissionCount: result.submissionCount,
    //   };
    // })

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}