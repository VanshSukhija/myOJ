import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { CommentType } from "@utils/types";

export async function POST(req: Request) {
  const { blogID, userID } = await req.json();
  try {
    const results: any = await excuteQuery({
      query: `
        SELECT temp.contribution, action.hasLiked, comment.*, user.name AS username, user.image FROM comment
        INNER JOIN user ON user.id = comment.id
        LEFT JOIN (
          SELECT SUM(hasLiked) AS contribution, commentID, blogID FROM action
          GROUP BY blogID, commentID
        ) AS temp ON temp.commentID = comment.commentID AND temp.blogID = comment.blogID
        LEFT JOIN action ON
          action.blogID = comment.blogID AND
          action.commentID = comment.commentID AND
          action.id = ?
        WHERE comment.blogID = ?
        ORDER BY comment.commentID DESC;
      `,
      values: [userID, blogID],
    });

    let comments: { [key: string]: CommentType[] } = {};
    results.forEach((comment: any) => {
      if(!comments[comment.parentComment || 'null']) 
        comments[comment.parentComment || 'null'] = [];
      comments[comment.parentComment || 'null'].push(comment)
    })

    return NextResponse.json({ comments, status: "success" });
  } catch (error) {
    return NextResponse.json({ error, status: "error" });
  }
}