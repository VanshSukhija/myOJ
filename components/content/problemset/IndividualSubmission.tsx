import { SubmissionsByProblemType } from '@utils/types'
import React from 'react'
import { Editor as CodeEditor } from '@monaco-editor/react';
import { verdictNames } from '@utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const IndividualSubmission = ({ submission, onClose }: { submission: SubmissionsByProblemType | null, onClose: () => void }) => {
  return submission && (
    <div className='flex w-full h-full flex-col gap-2 items-center'>
      <div className='w-full flex justify-between items-center'>
        <div className='w-[90%] flex justify-start gap-1 flex-wrap'>
          <span>#{submission.submissionID},</span>
          <span>{submission.username},</span>
          <span>{submission.problemName},</span>
          <span className={`${submission.verdict === 0 ? 'text-green-500' : 'text-red-500'}`}>
            {verdictNames[submission.verdict]}
          </span>
        </div>
        <FontAwesomeIcon 
          icon={faPlus} 
          className='cursor-pointer rotate-45 text-2xl' 
          onClick={onClose}
        />
      </div>
      <div className='w-full h-full'>
        <CodeEditor
          language={submission.language || 'cpp'}
          value={submission.code || ''}
          theme="vs-dark"
          wrapperProps={{ style: { height: '100%', width: '100%' } }}
          className='w-full h-full text-white border border-white'
          options={{
            wordWrap: 'on',
            readOnly: true
          }}
        />
      </div>
    </div>
  )
}

export default IndividualSubmission
