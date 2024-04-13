import { NextResponse } from "next/server";
import excuteQuery from "@utils/database";
import { ContestType } from "@utils/types";
import { fixDateTime } from "@utils/functions";

export async function GET() {
  try {
    const results = await excuteQuery({
      query: `
        SELECT * FROM contest;
      `,
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  const contest: ContestType = await req.json();

  const contestValues = [
    contest.contestID,
    contest.contestName,
    contest.contestDescription,
    contest.createdBy,
    fixDateTime(contest.registrationTime),
    fixDateTime(contest.startTime),
    fixDateTime(contest.endTime)
  ]

  const problemValues = contest.problems.map((problem) => {
    return [
      problem.problemID,
      contest.contestID,
      contest.createdBy,
      problem.problemName,
      problem.difficulty === 0 ? 'EASY' : problem.difficulty === 1 ? 'MEDIUM' : 'HARD',
      problem.problemDescription,
      problem.inputFormat,
      problem.outputFormat,
      problem.constraints,
      problem.timeLimit,
      problem.memoryLimit,
      problem.tags,
      problem.note,
    ];
  })

  const testValues = contest.problems.map((problem) => {
    return problem.testcases.map((testcase) => {
      return [
        testcase.id,
        problem.problemID,
        contest.contestID,
        testcase.input,
        testcase.expectedOutput
      ];
    });
  })

  const values = [
    contestValues,
    problemValues,
    testValues
  ].flat(3)

  try {
    const results = await excuteQuery({
      query: `
        INSERT INTO contest (
          contestID, 
          contestName, 
          contestDescription, 
          createdBy, 
          registrationTime, 
          startTime, 
          endTime
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?
        )
        ON DUPLICATE KEY UPDATE
          contestName = VALUES(contestName), 
          contestDescription = VALUES(contestDescription), 
          createdBy = VALUES(createdBy), 
          registrationTime = VALUES(registrationTime), 
          startTime = VALUES(startTime), 
          endTime = VALUES(endTime)
        ;

        INSERT INTO problem (
          problemID, 
          contestID, 
          createdBy, 
          problemName, 
          difficulty,
          problemDescription,
          inputFormat, 
          outputFormat, 
          constraints, 
          timeLimit, 
          memoryLimit, 
          tags, 
          note,
        ) 
        VALUES ${
          contest.problems.map((_) => {
            return `(
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`;
          }).join(", ")
        }
        ON DUPLICATE KEY UPDATE 
          problemName = VALUES(problemName), 
          difficulty = VALUES(difficulty), 
          problemDescription = VALUES(problemDescription), 
          inputFormat = VALUES(inputFormat), 
          outputFormat = VALUES(outputFormat), 
          constraints = VALUES(constraints), 
          timeLimit = VALUES(timeLimit), 
          memoryLimit = VALUES(memoryLimit), 
          tags = VALUES(tags), 
          note = VALUES(note),
        ;

        INSERT INTO test (
          testID, 
          problemID, 
          contestID,
          input, 
          expectedOutput
        )
        VALUES ${
          contest.problems.map((problem) => {
            return problem.testcases.map((_) => {
              return `(
                ?, ?, ?, ?, ?
              )`;
            }).join(", ");
          }).join(", ")
        }
        ON DUPLICATE KEY UPDATE 
          input = VALUES(input), 
          expectedOutput = VALUES(expectedOutput)
        ;
      `,
      values: values
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req: Request) {
  const { table, column, id } = await req.json();

  try {
    const results = await excuteQuery({
      query: `
        DELETE FROM ${table} WHERE ${column} = ${id};
      `,
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(error);
  }
}