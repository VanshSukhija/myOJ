"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Editor as CodeEditor } from '@monaco-editor/react';
import { codeRunner } from '@utils/functions';
import { SelectedProblemContext } from '@app/code/problemset/layout';
import { PostSubmissionType, SubmissionOutputType } from '@utils/types';
import { verdictNames } from '@utils/constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faThunderstorm } from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react';

const ProblemIDE = () => {
  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<string>('cpp')
  const [outputArray, setOutputArray] = useState<SubmissionOutputType[]>([])
  const { selectedProblem } = useContext(SelectedProblemContext)
  const [customInput, setCustomInput] = useState<string>('')
  const [customOutput, setCustomOutput] = useState<SubmissionOutputType | null>(null)
  const { data: session, status } = useSession()

  const firstNonZeroCode = (outputArray: SubmissionOutputType[]) => {
    if (outputArray.length === 0) return -1;
    for (const output of outputArray) {
      if (output.status === 0) return output.error?.code || 6
    }
    return 0
  }

  const runTestCases = async (e: any) => {
    e.preventDefault()
    if (!selectedProblem) return
    setOutputArray(() => [])
    const output: SubmissionOutputType[] = await codeRunner(selectedProblem, code, language)
    setOutputArray(() => output)
  }

  const runCustomCase = async (e: any) => {
    e.preventDefault()
    if (!selectedProblem) return
    const output: SubmissionOutputType[] = await codeRunner({
      ...selectedProblem, testcases: [{
        id: "custom",
        input: customInput,
        expectedOutput: ''
      }]
    }, code, language)
    setCustomOutput(output[0])
  }

  useEffect(() => {
    if (!selectedProblem) return
    setCustomInput(selectedProblem.testcases[0].input)
  }, [selectedProblem])
  
  useEffect(() => {
    if(!outputArray.length) return;

    const postSubmission = async () => {
      if(!selectedProblem) return
      if(status === 'loading') return;
      if(!session) return;
      const submission: PostSubmissionType = {
        submissionID: `${Date.now()}`,
        problemID: selectedProblem.problemID,
        id: session.user.id,
        code: code,
        language: language,
        timeTaken: outputArray.map(output => Number(output.timeTaken)*100/100).sort((a, b) => b - a)[0].toString(), // max time taken
        memoryUsed: outputArray.map(output => Number(output.memoryUsed)*100/100).sort((a, b) => b - a)[0].toString(), // max memory used
        verdict: firstNonZeroCode(outputArray),
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/problemset/problems/${selectedProblem.problemID}/submissions/postSubmissions`, {
          method: 'POST',
          body: JSON.stringify(submission),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }

    }

    postSubmission();
  }, [outputArray]);

  // useEffect(() => console.log(customOutput), [customOutput]);

  const parseCustomOutput = (output: SubmissionOutputType | null) => {
    if (output === null) return ''
    if (output.status === 1) return output.output
    switch (output.error?.code) {
      case 0: return output.output
      case 1: return output.output
      case 2: return output.error.stderr
      case 3: return verdictNames[output.error.code]
      case 4: return verdictNames[output.error.code]
      case 5: return output.error.stdout
      default: return verdictNames[6]
    }
  }

  return (
    <div className='p-1 w-full h-full flex flex-col gap-3'>
      <div className='border-b-2 border-cyan-600 font-bold text-2xl flex justify-between items-center'>
        Code Editor
        <select
          className='text-white bg-transparent text-lg font-normal focus:outline-none focus:border border-cyan-600 px-2 h-fit'
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option className='bg-black' value="cpp">C++</option>
          <option className='bg-black' value="java">Java</option>
          <option className='bg-black' value="python">Python</option>
        </select>
      </div>

      <div className='w-5/6 h-full min-h-full mx-auto flex flex-col gap-3'>
        <CodeEditor
          language={language}
          value={code}
          theme="vs-dark"
          wrapperProps={{ style: { height: '100%', width: '100%' } }}
          onChange={(value: string | undefined) => setCode(value || '')}
          className='w-full h-full text-white border border-white'
          options={{
            wordWrap: 'on'
          }}
        />
      </div>

      <div className='w-5/6 h-full min-h-full mx-auto flex flex-col gap-3'>
        <div className='flex gap-2'>
          <textarea
            cols={30}
            rows={5}
            className='w-1/2 bg-black text-white border-2 border-cyan-600 focus:outline-none p-1'
            placeholder='Enter Custom Input'
            onChange={(e) => setCustomInput(e.target.value)}
            defaultValue={customInput}
          >
          </textarea>
          <textarea
            cols={30}
            rows={5}
            className='w-1/2 bg-black text-white border-2 border-cyan-600 focus:outline-none p-1'
            placeholder='Output for Custom Input will appear here'
            readOnly
            defaultValue={parseCustomOutput(customOutput)}
          >
          </textarea>
        </div>

        <div className='flex gap-2'>
          <button className='bg-cyan-600 px-2 py-1 rounded-full border-2 border-white w-28 min-w-fit hover:bg-white hover:text-cyan-600' onClick={runCustomCase}>Run</button>
          <button className='bg-cyan-600 px-2 py-1 rounded-full border-2 border-white w-28 min-w-fit hover:bg-white hover:text-cyan-600' onClick={runTestCases}>Submit</button>
        </div>

        <div className='flex flex-col gap-2 max-h-1/3'>
          {
            outputArray.map((output, index) => {
              return (
                <Testcase
                  key={index}
                  index={index}
                  verdictCode={output.status === 1 ? 0 : output.error?.code || 6}
                  timeTaken={output.timeTaken}
                  memoryUsed={output.memoryUsed}
                />
              )
            })
          }
          {
            firstNonZeroCode(outputArray) === 0 ?
              <div className='text-green-500 text-2xl font-bold'>
                Accepted :)
              </div> :
              firstNonZeroCode(outputArray) > 0 ?
                <div className='text-red-500 text-2xl font-bold'>
                  {verdictNames[firstNonZeroCode(outputArray)]} :(
                </div> : null
          }
        </div>
      </div>
    </div>
  )
}

const Testcase = ({ verdictCode, index, timeTaken, memoryUsed }: { verdictCode: number, index: number, timeTaken: string, memoryUsed: string }) => {
  return (
    <div className={`w-full text-white flex justify-between items-center p-2 ${verdictCode === 0 ? 'bg-green-500' : 'bg-red-500'}`}>
      <span>Test #{index + 1}</span>
      <span>
        {verdictNames[verdictCode]}
      </span>
      <div className='flex items-center gap-3'>
        <div className='flex gap-1 items-center'>
          <FontAwesomeIcon icon={faClock} title="Time Taken" />
          <code title='Time Taken'>{timeTaken}s</code>
        </div>
        <div className='flex gap-1 items-center'>
          <FontAwesomeIcon icon={faThunderstorm} title="Memory Used" />
          <code title='Memory Used'>{(Number(memoryUsed) / 1024).toPrecision(3)}MB</code>
        </div>
      </div>
    </div>
  )
}

export default ProblemIDE
