import React from 'react'
import Loader from '../UI/Loader/Loader'
import ListItem from '../ListItem/ListItem'
import EmptyList from '../EmptyList'
import PropTypes from 'prop-types'
import css from './ListQuestions.module.scss'


const ListQuestions = React.memo((props) => {
  const { questions, reference, isLoading } = props

  const renderQuestions = questions.map((item, index) => {
    if (questions.length === index + 1) {
      return <div key={ index }>
        <ListItem reference={ reference } { ...item }/>
        { isLoading && <Loader/> }
      </div>
    }
    return <ListItem key={ index } { ...item }/>
  })

  return (
    <div className={ css.ListResults }>
      {
        questions.length === 0
          ? <EmptyList/>
          : renderQuestions
      }
    </div>
  )
})

ListQuestions.propTypes = {
  questions: PropTypes.array.isRequired
}

export default ListQuestions



