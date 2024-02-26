import { ProblemType } from '@utils/types';
import problemset from "@components/dashboard/problems.json";

export async function codeRunner(problem: ProblemType, code: string, language: string) {
  let outPutArray: string[] = [];
  try {
    for (const testcase of problem.testcases) {
      await fetch(`http://localhost:3000/code/problemset/problems/${problem.id}/api`, {
        method: 'POST',
        body: JSON.stringify({
          code: code,
          extension: language,
          input: testcase.input,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => outPutArray.push(data.output))
        .catch(err => console.error(err))
    }
  } catch (err) {
    console.error(err);
  }
  return outPutArray;
}

export function getProblem(id: number) {
  let data: ProblemType = Object()

  const arr = problemset.problems.filter((e: ProblemType) => e.id === id)
  if (arr.length){
    data = arr[0]
  }

  return data;
}