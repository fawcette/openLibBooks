import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setSortType} from '../store'

/**
 * COMPONENT
 */
class BookFilters extends React.Component {

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (event) {
    this.props.setSort(event.target.value)
  }

  render () {
    return (
      <div>
        Sort By: 
        <select name="type" onChange={this.handleChange}>
          <option value="none">None</option>
          <option value="title">Title</option>
          <option value="year">Year Published</option>
        </select>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSort: (type) => dispatch(setSortType(type))
  }
}

export default connect(null, mapDispatchToProps)(BookFilters)

/**
 * PROP TYPES
 */
BookFilters.propTypes = {
}
