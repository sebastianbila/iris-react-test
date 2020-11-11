import { createAction } from '@reduxjs/toolkit'

export const fetchQuestion = createAction('questions/fetchQuestion')
export const fetchQuestionsSuccess = createAction('questions/fetchQuestionsSuccess')
export const fetchQuestionsError = createAction('questions/fetchQuestionsError')
