import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: Number(process.env.NEXT_PUBLIC_MYSQL_PORT),
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    multipleStatements: true
  }
});

export default async function excuteQuery({ query, values }: { query: string; values?: any }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
