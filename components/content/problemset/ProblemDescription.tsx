"use client"
import React, { useContext } from 'react'
import { SelectedProblemContext } from '@app/code/problemset/layout';

const ProblemDescription = () => {
  const { selectedProblem } = useContext(SelectedProblemContext)

  return (
    <div className='p-1'>
      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Description</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.problemDescription || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Input</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.inputFormat || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Output</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.outputFormat || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Constraints</div>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: selectedProblem?.constraints || '' }}>
        </div>
      </section>
      <br />

      <section>
        <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Sample Testcases</div>
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
            <div className='border-b-2 border-cyan-600 font-bold text-2xl'>Note</div>
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
