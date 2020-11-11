import React from 'react'
import PropTypes from 'prop-types'
import css from './ListItem.module.scss'

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  creationDate: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  viewCount: PropTypes.number.isRequired,
  answerCount: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired
}

function ListItem(props) {
  const {
    title = 'Some title',
    link = 'https://google.com',
    user = 'User',
    creationDate = new Date(),
    score = 9,
    viewCount = 0,
    answerCount = 0,
    tags = [],
    reference
  } = props

  let renderTags = null
  if (tags) {
    renderTags = tags.map((name, key) => <span key={key}>{name}</span>)
  }

  return (
    <div className={css.ListItem} ref={reference}>
      <div className={css.header}>
        <div className={css.score}>{score}</div>
        <div className={css.title}>
          <a href={link}
             target='_blank'
             rel="noreferrer">
            {title}
          </a>
        </div>
      </div>
      <div className={css.body}>
        <div>
          {new Date(creationDate).toLocaleDateString('en-US',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }
          )}
        </div>
        <div className={css.user}>{user}</div>
      </div>
      <div className={css.footer}>
        <div className={css.tags}>{renderTags}</div>
        <div className={css.details}>
          <div className={css.answers}>{answerCount} answers</div>
          <div>{viewCount} views</div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
