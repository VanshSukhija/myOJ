import { SelectedContestContext, SelectedProblemContext } from '@utils/contexts'
import ProblemSubmissions from '@components/content/problemset/ProblemSubmissions'
import React from 'react'

const page = () => {
  return (
    <ProblemSubmissions SelectedProblemContext={SelectedProblemContext} primaryColor='pink-600' SelectedContestContext={SelectedContestContext} />
  )
}

export default page
