import { createReducer } from '@reduxjs/toolkit'
import {
  fetchQuestion,
  fetchQuestionsError,
  fetchQuestionsSuccess
} from './questions.action'

const initialState = {
  items: [],
  loading: false
}

const questionsReducer = createReducer(initialState, {
  [fetchQuestion]: (state) => {
    state.loading = true
  },
  [fetchQuestionsError]: (state) => {
    state.loading = false
  },
  [fetchQuestionsSuccess]: (state, action) => {
    state.loading = false
    state.items = action.payload
  }
})

export default questionsReducer
