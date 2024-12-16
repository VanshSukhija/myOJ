import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";

export async function GET() {
  try {
    const results = await excuteQuery({
      query: `
        SELECT blog.blogID, blog.title, user.name AS username, temp.contribution FROM blog
        INNER JOIN user ON user.id = blog.createdBy
        LEFT JOIN (
          SELECT SUM(hasLiked) AS contribution, blogID FROM action
          WHERE commentID = ''
          GROUP BY blogID
        ) AS temp ON temp.blogID = blog.blogID
        ORDER BY blog.blogID DESC;
      `,
    });

    return NextResponse.json({results, status: "success"});
  } catch (error) {
    return NextResponse.json({error, status: "error"});
  }
}

export async function POST(req: Request) {
  const { blogID, userID } = await req.json();
  try {
    const results = await excuteQuery({
      query: `
        SELECT blog.*, user.name AS username, user.image, temp.contribution, action.hasLiked FROM blog
        INNER JOIN user ON user.id = blog.createdBy
        LEFT JOIN (
          SELECT SUM(hasLiked) AS contribution, blogID FROM action
          WHERE commentID = '' AND id != ?
          GROUP BY blogID
        ) AS temp ON temp.blogID = blog.blogID
        LEFT JOIN action ON 
          action.blogID = blog.blogID AND 
          action.id = ? AND
          action.commentID = ''
        WHERE blog.blogID = ?;
      `,
      values: [userID, userID, blogID],
    });

    return NextResponse.json({results, status: "success"});
  } catch (error) {
    return NextResponse.json({error, status: "error"});
  }
}