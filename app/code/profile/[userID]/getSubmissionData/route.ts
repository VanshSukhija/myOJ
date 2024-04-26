import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const res: any = await excuteQuery({
      query: `
      SELECT
        DATE(DATE_ADD('1970/1/1', INTERVAL CAST(submissionID AS SIGNED) div 1000 SECOND)) AS submissionDate,
        COUNT(DATE(DATE_ADD('1970/1/1', INTERVAL CAST(submissionID AS SIGNED) div 1000 SECOND))) AS submissionCount
      FROM submission
      WHERE submission.id = ?
      GROUP BY submissionDate;
      `,
      values: [userID],
    });

    if (res.error) throw new Error(res.error);

    const results = res.map((result: any) => {
      return {
        submissionDate: new Date(result.submissionDate).toISOString().split('T')[0],
        submissionCount: result.submissionCount,
      };
    })

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}