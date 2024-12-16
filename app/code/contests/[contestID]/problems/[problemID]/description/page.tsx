import ProblemDescription from '@components/content/problemset/ProblemDescription'
import { SelectedProblemContext } from '@utils/contexts'
import React from 'react'

const page = () => {
  return (
    <ProblemDescription SelectedProblemContext={SelectedProblemContext} primaryColor='pink-600' />
  )
}

export default page
