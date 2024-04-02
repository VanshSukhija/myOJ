import { NextResponse } from "next/server"
import fs from 'fs';
import path from 'path';
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

export async function POST(req: Request, res: Response) {
  // container has already been built
  const data = await req.json()
  const filePath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', `Main.${data.extension}`);
  const inputPath = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker', 'input.txt');

  // write the code to source file
  fs.writeFile(filePath, data.code, (err: any) => {
    if (err) throw err;
  });

  // write the input to input file
  fs.writeFile(inputPath, data.input, (err: any) => {
    if (err) throw err;
  });

  // run the code
  try {
    const cwd = path.join(process.cwd(), 'app', 'code', 'problemset', 'docker');
    const cmd = `docker run -v ${cwd}:/app/ myoj-code-runner ${data.extension} 1 512`
    const runOutput = await execAsync(cmd, { cwd: cwd });
    return NextResponse.json({ message: 'Code ran successfully', output: runOutput });
  } catch (error) {
    return NextResponse.json({ message: 'Error running code', error: error });
  }
}