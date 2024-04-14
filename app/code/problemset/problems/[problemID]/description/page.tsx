import { SelectedProblemContext } from '@app/code/problemset/layout'
import ProblemDescription from '@components/content/problemset/ProblemDescription'
import React from 'react'

const page = () => {
  return (
    <ProblemDescription SelectedProblemContext={SelectedProblemContext} primaryColor='cyan-600' />
  )
}

export default page
