import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ContestStandingsType } from "@utils/types";

export async function POST(req: Request) {
  const { contestID, startTime, endTime } = await req.json();

  try {
    const result: any = await excuteQuery({
      query: `
        SELECT 
          party.id, 
          user.name AS username,
          user.email,
          problem.problemID, 
          problem.problemName, 
          MIN(submission.verdict) AS minimumVerdict, 
          temp.lastAcceptedSubmission AS lastAcceptedSubmission, 
          temp2.wrongSubmissions,
          temp.acceptedProblemCount AS acceptedProblemCount
        FROM party
        JOIN problem
        INNER JOIN user ON user.id = party.id
        LEFT JOIN submission ON submission.id = party.id AND submission.problemID = problem.problemID
        LEFT JOIN (
          SELECT 
            submission.id, 
            MAX(submission.submissionID) AS lastAcceptedSubmission, 
            COUNT(DISTINCT submission.problemID) AS acceptedProblemCount 
          FROM submission
          WHERE submission.verdict = 0 AND submission.submissionID <= ? AND submission.submissionID >= ?
          GROUP BY submission.id
        ) AS temp ON temp.id = party.id
        LEFT JOIN (
          SELECT 
            submission.id, 
            submission.problemID, 
            COUNT(submission.submissionID) AS wrongSubmissions 
          FROM submission
          WHERE submission.verdict > 0 AND submission.submissionID <= ? AND submission.submissionID >= ?
          GROUP BY submission.id, submission.problemID
        ) AS temp2 ON temp2.id = party.id AND temp2.problemID = problem.problemID
        WHERE party.contestID = ? AND problem.contestID = ?
        GROUP BY party.id, problem.problemID, problem.problemName
        ORDER BY party.id, problem.problemID;
      `,
      values: [endTime, startTime, endTime, startTime, contestID, contestID]
    });

    let res: ContestStandingsType[] = [];
    result.forEach((row: any) => {
      const newRow = {
        id: row.id,
        username: row.username,
        email: row.email,
        lastAcceptedSubmission: row.lastAcceptedSubmission,
        acceptedProblemCount: row.acceptedProblemCount,
        problems: [
          {
            problemID: row.problemID,
            problemName: row.problemName,
            minimumVerdict: row.minimumVerdict,
            wrongSubmissions: row.wrongSubmissions
          }
        ],
        score: {
          penalty: row.lastAcceptedSubmission !== null ? -1*Number(row.lastAcceptedSubmission) : 0,
          accepted: row.acceptedProblemCount !== null ? Number(row.acceptedProblemCount) : 0,
        }
      }

      if(!res.length || res[res.length - 1].id !== row.id) {
        res.push(newRow);
      } else {
        res[res.length - 1].problems.push(newRow.problems[0]);
      }
    })

    res.sort((a: ContestStandingsType, b: ContestStandingsType) => {
      if(a.score.accepted !== b.score.accepted) return b.score.accepted - a.score.accepted;

      const getPenalty = (penalty: number, wrongSubmissions: number) => {
        if (!penalty) return 0
        const timeDifference = new Date(penalty * (-1) - new Date(Number(startTime)).getTime()).getTime()
        const hours = Math.floor(timeDifference / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60) + hours * 60)
        return minutes + 5*wrongSubmissions
      }

      let aWrongSubmissions = 0, bWrongSubmissions = 0;
      a.problems.forEach((problem: any) => aWrongSubmissions += problem.wrongSubmissions ? problem.wrongSubmissions : 0);
      b.problems.forEach((problem: any) => bWrongSubmissions += problem.wrongSubmissions ? problem.wrongSubmissions : 0);

      const aPenalty = getPenalty(a.score.penalty, aWrongSubmissions);
      const bPenalty = getPenalty(b.score.penalty, bWrongSubmissions);

      if(aPenalty !== bPenalty) return aPenalty - bPenalty;

      return aWrongSubmissions - bWrongSubmissions;
    })

    return NextResponse.json({status: "success", result: res});
  } catch (error) {
    return NextResponse.json({status: "error", error});
  }
}