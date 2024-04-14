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
  testcases: TestcaseType[];
  note: string;
  createdBy: string;
}

export type TestcaseType = {
  id: string | string[];
  input: string;
  expectedOutput: string;
}

export type OnlyProblemType = {
  problemID: string | string[];
  contestID: string | string[];
  problemName: string;
  difficulty: number;
  tags: string;
  minimumVerdict: number | null;
  acceptedSubmissions: number | null;
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
  testcases: TestcaseType[];
  note: string;
  createdBy: string;
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

export type SubmissionOutputType = {
  status: number;
  timeTaken: string;
  memoryUsed: string;
  output: string;
  error?: {
    cmd: string;
    code: number;
    signal: string | null;
    stdout: string;
    stderr: string;
    killed: boolean;
  };
  runOutput?: {
    stdout: string;
    stderr: string;
  };
}

export type PostSubmissionType = {
  submissionID: string | string[];
  problemID: string | string[];
  id: string | string[];
  code: string;
  language: string;
  timeTaken: string;
  memoryUsed: string;
  verdict: number;
}

export type SubmissionsByProblemType = {
  submissionID: string | string[];
  problemID: string | string[];
  id: string | string[];
  code: string;
  language: string;
  timeTaken: string;
  memoryUsed: string;
  verdict: number;
  username: string;
  problemName: string;
}

export type ContestWithParticipantsType = {
  contestID: string | string[];
  contestName: string;
  startTime: string;
  endTime: string;
  participantCount: number;
}

export type UserType = {
  id: string | string[];
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}