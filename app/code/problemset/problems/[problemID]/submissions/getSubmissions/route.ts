import { NextResponse } from "next/server"
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { problemID, userID } = await req.json();
  try {
    const result = await excuteQuery({
      query: `
        SELECT submission.*, problem.problemName, user.name AS username FROM submission
        INNER JOIN problem ON problem.problemID = submission.problemID
        INNER JOIN user ON user.id = submission.id
        WHERE submission.problemID = ? AND submission.id = ?
        ORDER BY submission.submissionID DESC;
      `,
      values: [problemID, userID]
    })

    return NextResponse.json({ status: 'success', data: result});
  } catch (error) {
    return NextResponse.json({ status: 'error', error});
  }
}