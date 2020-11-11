import { call, delay, put, select, takeEvery } from 'redux-saga/effects'
import {
  fetchQuestion,
  fetchQuestionsError,
  fetchQuestionsSuccess
} from './questions.action'
import { fetchQuestionFromAPI } from './questions.service'
import { getQuestions } from './questions.selector'

function* fetchingQuestions(action) {
  try {
    const response = yield call(fetchQuestionFromAPI, action.payload)
    const previousQuestions = yield select(getQuestions)

    const questions = action.payload.loadMore
      ? [ ...previousQuestions, ...response ]
      : response

    yield delay(400)
    yield put(fetchQuestionsSuccess(questions))
  } catch (e) {
    console.log('Error', e.message)
    yield put(fetchQuestionsError())
  }
}

export default function* todosWatcher() {
  yield takeEvery(fetchQuestion.type, fetchingQuestions)
}
