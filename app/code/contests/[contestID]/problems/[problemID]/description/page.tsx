import ProblemDescription from '@components/content/problemset/ProblemDescription'
import { SelectedProblemContext } from '@app/code/contests/layout'
import React from 'react'

const page = () => {
  return (
    <ProblemDescription SelectedProblemContext={SelectedProblemContext} primaryColor='pink-600' />
  )
}

export default page
