import { NextResponse } from "next/server"
import fs from 'fs';
import path from 'path';
import { promisify } from "util";
import { exec } from "child_process";
import { verdicts } from "@utils/constants";

const execAsync = promisify(exec);

export async function POST(req: Request, res: Response) {
  // image has already been built
  const data = await req.json()
  const { code, extension, input, expectedOutput, timeLimit, memoryLimit } = data;
  const filePath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', `Main.${data.extension}`);
  const inputPath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', 'input.txt');
  const expectedOutputPath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', 'expectedOutput.txt');
  const outputPath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', 'output.txt');
  const time_memoryPath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', 'time_memory.txt');

  // write the code to Main file
  fs.writeFile(filePath, code, (err: any) => {
    if (err) throw err;
  });

  // write the input to input.txt file
  fs.writeFile(inputPath, input, (err: any) => {
    if (err) throw err;
  });

  // write the expectedOutput to expectedOutput.txt file
  fs.writeFile(expectedOutputPath, expectedOutput, (err: any) => {
    if (err) throw err;
  });

  // run the code
  try {
    const cwd = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker');
    const cmd = `docker run -v ${filePath}:/app/Main.${extension} -v ${inputPath}:/app/input.txt -v ${expectedOutputPath}:/app/expectedOutput.txt -v ${outputPath}:/app/output.txt -v ${time_memoryPath}:/app/time_memory.txt myoj-code-runner ${extension} ${timeLimit} ${memoryLimit}`
    // const cmd = `docker run -v ${cwd}:/app/ myoj-code-runner ${extension} ${timeLimit} ${memoryLimit}`

    const runOutput = await execAsync(cmd, { cwd: cwd });
    
    const timeTaken: string = fs.readFileSync(time_memoryPath, 'utf8')
    .split('\n')
    .filter((line: string) => line.includes('time_taken'))[0]
    .split(' ')[1] || "0.00";

    const memoryUsed: string = fs.readFileSync(time_memoryPath, 'utf8')
    .split('\n')
    .filter((line: string) => line.includes('memory_used'))[0]
    .split(' ')[1] || "0";
    
    const output: string = fs.readFileSync(outputPath, 'utf8').trim();

    return NextResponse.json({
      status: 1,
      timeTaken: timeTaken,
      memoryUsed: memoryUsed,
      output: output,
      verdict: "AC",
      runOutput: runOutput
    });
  } catch (error: any) {
    const timeTaken: string = fs.readFileSync(time_memoryPath, 'utf8')
    .split('\n')
    .filter((line: string) => line.includes('time_taken'))[0]
    .split(' ')[1] || "0.00";

    const memoryUsed: string = fs.readFileSync(time_memoryPath, 'utf8')
    .split('\n')
    .filter((line: string) => line.includes('memory_used'))[0]
    .split(' ')[1] || "0";
    
    const output: string = fs.readFileSync(outputPath, 'utf8').trim();
    
    return NextResponse.json({
      status: 0,
      error: error,
      output: output,
      timeTaken: timeTaken,
      memoryUsed: (memoryUsed <= String(memoryLimit)) ? memoryUsed : memoryLimit.toString(),
      verdict: verdicts[error.code]
    });
  }
}