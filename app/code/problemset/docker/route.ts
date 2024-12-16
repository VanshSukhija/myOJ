import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import { join } from "path";

const execAsync = promisify(exec);

export async function GET() {
  try {
    const cmd = `docker build -t myoj-code-runner .`
    const cwd = join(process.cwd(), 'app', 'code', 'problemset', 'docker');
    const buildOutput = await execAsync(cmd, { cwd: cwd });
    return NextResponse.json({ message: 'Docker image built successfully', output: buildOutput });
  } catch (error) {
    return NextResponse.json({ message: 'Error building Docker image', error: error });
  }
}