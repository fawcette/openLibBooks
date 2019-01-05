import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
const SearchForm = props => {

  return (
    <div>
      <form onSubmit={props.handleSubmit} name={name}>
        <div>
          <label htmlFor="search">
            <small>Search</small>
          </label>
          <input name="search" type="text" />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm

/**
 * PROP TYPES
 */
SearchForm.propTypes = {
}
