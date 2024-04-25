import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function POST(req: Request) {
  const { userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT user.*, temp.contribution FROM user
        LEFT JOIN (
          SELECT temp2.id, temp1.blogContribution + temp2.commentContribution AS contribution
          FROM (
            SELECT SUM(action.hasLiked) AS blogContribution, blog.createdBy FROM blog
            LEFT JOIN action ON 
              action.blogID = blog.blogID AND 
              action.commentID = ''
            GROUP BY blog.createdBy
          ) AS temp1 JOIN (
            SELECT SUM(action.hasLiked) AS commentContribution, comment.id FROM comment
            LEFT JOIN action ON 
              action.commentID = comment.commentID AND 
              action.blogID = comment.blogID
            GROUP BY comment.id
          ) AS temp2
        ) AS temp ON temp.id = user.id
        WHERE user.id = 'cltq7280z000010vd0eqa8kdg';
      `,
      values: [userID],
    });

    if(results.error) throw new Error(results.error);

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

    if(results.error) throw new Error(results.error);

    return NextResponse.json({ status: 'success', results });
  } catch (error) {
    return NextResponse.json({ status: 'error', error });
  }
}