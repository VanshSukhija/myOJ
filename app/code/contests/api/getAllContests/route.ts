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
  const { contestID } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
          SELECT * FROM contest
          WHERE contestID = ?;

          SELECT user.id, user.name, user.email, user.image, user.isAdmin FROM party
          INNER JOIN user ON user.id = party.id
          WHERE contestID = '1711721422159'
          ORDER BY user.name ASC;
        `,
      values: [contestID, contestID]
    });

    return NextResponse.json({
      status: "success",
      contestDetails: result[0].length > 0 ? result[0][0] : null,
      participants: result[1]
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}