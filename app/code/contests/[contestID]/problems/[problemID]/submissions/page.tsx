import { SelectedContestContext, SelectedProblemContext } from '@app/code/contests/layout'
import ProblemSubmissions from '@components/content/problemset/ProblemSubmissions'
import React from 'react'

const page = () => {
  return (
    <ProblemSubmissions SelectedProblemContext={SelectedProblemContext} primaryColor='pink-500' SelectedContestContext={SelectedContestContext} />
  )
}

export default page
