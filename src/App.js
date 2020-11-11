import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useQuery } from './hooks/useQuery'
import Search from './components/UI/Search/Search'
import Button from './components/UI/Button/Button'
import Loader from './components/UI/Loader/Loader'
import ListQuestions from './components/ListQuestions/ListQuestions'
import ModalFilter from './components/UI/ModalFilter'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestion } from './redux/ducks/questions/questions.action'
import {
  getQuestions,
  isLoading
} from './redux/ducks/questions/questions.selector'

function App() {
  const query = useQuery()
  const history = useHistory()
  const dispatch = useDispatch()

  /* Local State */
  const [ tags, setTags ] = useState(query.get('tags') || '')
  const [ params, setParams ] = useState({ tags, page: 1 })
  const [ modal, setModal ] = useState(false)

  /* Data from Store */
  const loading = useSelector(isLoading)
  const questions = useSelector(getQuestions)

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      setParams({ ...params, tags: tags })
      if (tags) {
        history.push(`/search?tags=${ tags }`)
      } else history.push('/')
    }
  }

  const changeParams = (receivedParams) => setParams(
    { ...params, ...receivedParams, loadMore: false }
  )

  const observer = useRef()
  const lastElement = useCallback(node => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setParams({
          ...params,
          loadMore: true,
          page: params.page + 1
        })
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    dispatch(fetchQuestion(params))
  }, [params])

  return (
    <div className="container">
      <ModalFilter
        show={modal}
        close={() => setModal(false)}
        changeParams={changeParams}
      />

      <div className="header">
        <Search
          placeholder='Search by tag ...'
          value={tags}
          onChange={e => setTags(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button
          text='Filter'
          onClick={() => setModal(true)}/>
      </div>
      {loading && <Loader/>}
      <ListQuestions questions={questions}
                     reference={lastElement}
                     isLoading={loading}/>
    </div>
  )
}

export default App

