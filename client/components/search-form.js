import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getSearchedBooks} from '../store'

/**
 * COMPONENT
 */
class SearchForm extends React.Component {

  constructor () {
    super()
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.getBooks(this.state.search)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="search">
              <small>Search</small>
            </label>
            <input name="search" type="text" onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (searchQuery) => dispatch(getSearchedBooks(searchQuery))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm)

/**
 * PROP TYPES
 */
SearchForm.propTypes = {
}
