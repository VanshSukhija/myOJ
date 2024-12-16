import { NextResponse } from "next/server"
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { problemID, startTime, endTime } = await req.json();
  try {
    const result = await excuteQuery({
      query: `
        SELECT submission.*, problem.problemName, user.name AS username FROM submission
        INNER JOIN problem ON problem.problemID = submission.problemID
        INNER JOIN user ON user.id = submission.id
        WHERE submission.problemID = ? AND submission.submissionID >= ? AND submission.submissionID <= ?
        ORDER BY submission.submissionID DESC;
      `,
      values: [problemID, startTime, endTime]
    })

    return NextResponse.json({ status: 'success', data: result});
  } catch (error) {
    return NextResponse.json({ status: 'error', error});
  }
}