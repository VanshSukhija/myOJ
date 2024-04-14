"use client"
import React, { useContext, useEffect } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { DisplayProblemType } from '@utils/types';

const ProblemDescription = ({ SelectedProblemContext, primaryColor }: {
  SelectedProblemContext: React.Context<{
    selectedProblem: DisplayProblemType | null;
    setSelectedProblem: React.Dispatch<React.SetStateAction<DisplayProblemType | null>>
  }>,
  primaryColor: string,
}) => {
  const { selectedProblem } = useContext(SelectedProblemContext)

  useEffect(() => {
    if (typeof window !== 'undefined')
      window.katex = katex
  }, [katex])

  return (
    <div className='p-1'>
      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Description</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.problemDescription || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Input</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.inputFormat || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Output</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.outputFormat || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Constraints</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.constraints || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Sample Testcases</div>
        <table className='table-auto border-2 border-slate-600 w-3/4 m-auto my-3'>
          <thead>
            <tr>
              <th className='border-2 border-slate-600 w-1/2'>Input</th>
              <th className='border-2 border-slate-600'>Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-2 border-slate-600'>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: selectedProblem?.testcases[0].input || '' }}>
                </div>
              </td>
              <td className='border-2 border-slate-600'>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: selectedProblem?.testcases[0].expectedOutput || '' }}>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <br />

      {
        selectedProblem?.note &&
        <>
          <section>
            <div className={`border-b-2 border-${primaryColor} font-bold text-2xl`}>Note</div>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: selectedProblem?.note || '' }}>
            </div>
          </section>
          <br />
        </>
      }
    </div>
  )
}

export default ProblemDescription
