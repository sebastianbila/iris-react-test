import React from 'react'
import css from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={css.center}>
      <div className={css.Loader}>
        <div/>
        <div/>
      </div>
    </div>
  )
}

export default Loader
