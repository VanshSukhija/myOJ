"use client";
import { DisplayProblemType, OnlyContestsType } from '@utils/types';
import { createContext, Dispatch, SetStateAction, Context } from 'react'

export const SelectedContestContext: Context<{
  selectedContest: OnlyContestsType | null;
  setSelectedContest: Dispatch<SetStateAction<OnlyContestsType | null>>;
}> | never = createContext<{
  selectedContest: OnlyContestsType | null;
  setSelectedContest: Dispatch<SetStateAction<OnlyContestsType | null>>;
}>({
  selectedContest: null,
  setSelectedContest: function (value: SetStateAction<OnlyContestsType | null>): void {
    throw new Error('Function not implemented.')
  }
});

export const SelectedProblemContext: Context<{
  selectedProblem: DisplayProblemType | null;
  setSelectedProblem: Dispatch<SetStateAction<DisplayProblemType | null>>;
}> | never = createContext<{
  selectedProblem: DisplayProblemType | null;
  setSelectedProblem: Dispatch<SetStateAction<DisplayProblemType | null>>;
}>({
  selectedProblem: null,
  setSelectedProblem: function (value: SetStateAction<DisplayProblemType | null>): void {
    throw new Error('Function not implemented.')
  }
});