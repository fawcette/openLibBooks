import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setSortType} from '../store'

/**
 * COMPONENT
 */
class BookSort extends React.Component {

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }a

  handleChange (event) {
    this.props.setSort(event.target.value)
  }

  render () {
    return (
      <div id="sort-container">
        <h5>Sort By:</h5> 
        <select name="type" onChange={this.handleChange}>
          <option value="none">None</option>
          <option value="title">Title</option>
          <option value="first_publish_year">Year Published</option>
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

export default connect(null, mapDispatchToProps)(BookSort)

/**
 * PROP TYPES
 */
BookSort.propTypes = {
}
