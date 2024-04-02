import { ProblemType } from '@utils/types';

export async function codeRunner(problem: ProblemType, code: string, language: string) {
  let outPutArray: string[] = [];
  try {
    for (const testcase of problem.testcases) {
      await fetch(`http://localhost:3000/code/problemset/problems/${problem.problemID}/api`, {
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
        .then(data => {
          console.log(data);
          outPutArray.push(data.output)
        })
        .catch(err => console.error(err))
    }
  } catch (err) {
    console.error(err);
  }
  return outPutArray;
}

export async function getProblem(problemID: string | string[]) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/problems/${problemID}/getProblemByID`, {
    method: 'POST',
    body: JSON.stringify({
      problemID: problemID
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(result => {
      return result;
    })
    .catch(err => console.error(err))

  return null;
}

export const fixDateTime = (datetime: string) => {
  return datetime.replace(':00.000Z', '');
}

export const addDateTimeOffset = (date: string) => {
  const currDate = new Date(date);
  const offset = currDate.getTimezoneOffset() || 0;
  const newDate = new Date(currDate.getTime() - (offset * 60 * 1000));
  return newDate.toISOString().replace(':00.000Z', '');
}