import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function GET() {
  try {
    const result: any = await excuteQuery({
      query: `
        SELECT COUNT(DISTINCT id) AS participantCount, contest.contestID, contest.contestName, contest.startTime, contest.endTime FROM party
        RIGHT JOIN contest ON party.contestID = contest.contestID
        GROUP BY contest.contestID, contest.contestName, contest.startTime, contest.endTime
        ORDER BY startTime DESC, contestID DESC;
      `
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  const { contestID, userID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
          SELECT * FROM contest
          WHERE contestID = ?;

          SELECT COUNT(DISTINCT id) AS participantCount FROM party
          WHERE contestID = ? AND id = ?;
        `,
      values: [contestID, contestID, userID]
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}