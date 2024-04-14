import { SelectedProblemContext } from '@app/code/contests/layout'
import ProblemIDE from '@components/content/problemset/ProblemIDE'
import React from 'react'

const page = () => {
  return (
    <ProblemIDE SelectedProblemContext={SelectedProblemContext} primaryColor='pink-500' />
  )
}

export default page
