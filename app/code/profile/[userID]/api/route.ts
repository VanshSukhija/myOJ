import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT user.*, temp.contribution FROM user
        LEFT JOIN (
          SELECT temp2.id, IFNULL(temp1.blogContribution, 0) + IFNULL(temp2.commentContribution, 0) AS contribution
          FROM (
            SELECT SUM(action.hasLiked) AS blogContribution, blog.createdBy FROM blog
            LEFT JOIN action ON action.blogID = blog.blogID AND action.commentID = ''
            WHERE blog.createdBy = ?
          ) AS temp1 JOIN (
            SELECT SUM(action.hasLiked) AS commentContribution, comment.id FROM comment
            LEFT JOIN action ON action.commentID = comment.commentID AND action.blogID = comment.blogID
            WHERE comment.id = ?
          ) AS temp2
        ) AS temp ON temp.id = user.id
        WHERE user.id = ?
      `,
      values: [userID, userID, userID],
    });

    if (results.error) throw new Error(results.error);

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}

export async function DELETE(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        DELETE FROM user WHERE id = ?;
      `,
      values: [userID],
    });

    if (results.error) throw new Error(results.error);

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}