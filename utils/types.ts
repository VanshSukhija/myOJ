export type ProblemType = {
  problemID: string | string[];
  problemName: string;
  problemDescription: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: number;
  tags: string;
  testcases: {
    id: string | string[];
    input: string;
    expectedOutput: string;
  }[];
  note: string;
  tutorial: string;
  solution: string;
  createdBy: string;
}

export type ContestType = {
  contestID: string | string[];
  contestName: string;
  contestDescription: string;
  startTime: string;
  endTime: string;
  registrationTime: string;
  problems: ProblemType[]
  createdBy: string;
}