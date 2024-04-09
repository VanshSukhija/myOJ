import { NextResponse } from "next/server"
import excuteQuery from "@utils/database";
import { PostSubmissionType } from "@utils/types";

export async function POST(req: Request) {
  const submission: PostSubmissionType = await req.json();
  try {
    const result = await excuteQuery({
      query: `
        INSERT INTO submission (submissionID, problemID, id, code, language, verdict, timeTaken, memoryUsed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `,
      values: [submission.submissionID, submission.problemID, submission.id, submission.code, submission.language, submission.verdict, submission.timeTaken, submission.memoryUsed]
    })

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}