export type ProblemType = {
  id: number;
  name: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: number;
  tags: string[];
  submissions: { // to be removed
    id: number;
    user: string;
    time: number;
    result: string;
  }[];
  testcases: {
    id: number;
    input: string;
    output: string;
    explaination: string;
  }[];
  note: string;
  tutorial: string;
  solution: string;
  createdBy: string;
}