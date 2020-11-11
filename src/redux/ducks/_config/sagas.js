import { all } from 'redux-saga/effects'
import todosWatcher from '../questions/questions.saga'

export default function* rootSaga() {
  yield all([
    todosWatcher()
  ])
}

