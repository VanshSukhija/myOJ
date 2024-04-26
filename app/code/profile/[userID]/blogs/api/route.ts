import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT blog.blogID, blog.title, user.name AS username, temp.contribution FROM blog
        INNER JOIN user ON user.id = blog.createdBy
        LEFT JOIN (
          SELECT SUM(hasLiked) AS contribution, blogID FROM action
          WHERE commentID = ''
          GROUP BY blogID
        ) AS temp ON temp.blogID = blog.blogID
        WHERE blog.createdBy = ?
        ORDER BY blog.blogID DESC;
      `,
      values: [userID],
    });

    if (results.error) throw new Error(results.error);

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}