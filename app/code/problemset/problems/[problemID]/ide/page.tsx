import { SelectedProblemContext } from '@utils/contexts'
import ProblemIDE from '@components/content/problemset/ProblemIDE'
import React from 'react'

const page = () => {
  return (
    <ProblemIDE SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
  )
}

export default page
