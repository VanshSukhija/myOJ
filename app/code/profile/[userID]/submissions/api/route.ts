import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { SubmissionsByUserType } from "@utils/types";

export async function POST(req: Request) {
  const { userID } = await req.json();

  try {
    const res: any = await excuteQuery({
      query: `
        SELECT submission.*, user.name AS username, problem.problemName, contest.* FROM submission
        LEFT JOIN problem ON problem.problemID = submission.problemID
        LEFT JOIN contest ON contest.contestID = problem.contestID
        LEFT JOIN user ON user.id = submission.id
        WHERE submission.id = ?
        ORDER BY submissionID DESC;
      `,
      values: [userID],
    });

    if (res.error) throw new Error(res.error);

    const results: SubmissionsByUserType[] = res.map((sub: any) => {
      return {
        submission: {
          submissionID: sub.submissionID,
          problemID: sub.problemID,
          id: sub.id,
          code: sub.code,
          language: sub.language,
          timeTaken: sub.timeTaken,
          memoryUsed: sub.memoryUsed,
          verdict: sub.verdict,
          username: sub.username,
          problemName: sub.problemName,
        },
        contestDetails: {
          contestID: sub.contestID,
          contestName: sub.contestName,
          ContestDescription: sub.ContestDescription,
          startTime: sub.startTime,
          endTime: sub.endTime,
          registrationTime: sub.registrationTime,
          createdBy: sub.createdBy,
        },
      };
    })

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}