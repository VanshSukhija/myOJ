export type ProblemType = {
  problemID: string | string[];
  contestID: string | string[];
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
  solutionLanguage: string;
  checkerCode: string;
  checkerLanguage: string;
}

export type OnlyProblemType = {
  problemID: string | string[];
  contestID: string | string[];
  problemName: string;
  difficulty: number;
  tags: string;
}

export type DisplayProblemType = {
  problemID: string | string[];
  contestID: string | string[];
  problemName: string;
  contestName: string;
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
  solutionLanguage: string;
  checkerCode: string;
  checkerLanguage: string;
  username: string;
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

export type OnlyContestsType = {
  contestID: string | string[];
  contestName: string;
  contestDescription: string;
  startTime: string;
  endTime: string;
  registrationTime: string;
  createdBy: string;
}