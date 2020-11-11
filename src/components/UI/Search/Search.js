import React from 'react'
import PropTypes from 'prop-types'
import css from './Search.module.scss'

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
}

function Search(props) {
  const {value, placeholder, onChange, onKeyDown} = props

  return (
    <div className={css.Search}>
      <input
        type="text"
        value={value}
        placeholder={placeholder || 'Search ...'}
        onChange={onChange}
        onKeyDown={onKeyDown || null}
      />
    </div>
  )
}

export default Search
