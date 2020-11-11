import React from 'react'
import PropTypes from 'prop-types'
import css from './Button.module.scss'

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

function Button(props) {
  const {
    text = 'Button',
    onClick = null
  } = props
  return (
    <div
      className={css.Button}
      onClick={onClick}>
      {text}
    </div>
  )
}

export default Button
