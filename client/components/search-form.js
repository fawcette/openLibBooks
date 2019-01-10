import React from 'react'
import {connect} from 'react-redux'
import {getSearchedBooks} from '../store'

/**
 * COMPONENT
 */
class SearchForm extends React.Component {

  constructor () {
    super()
    this.state = {
      search: '',
      type: 'q' // all
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.getBooks(this.state.search, this.state.type)
  }

  render () {
    return (
      <div id="search-bar-container">

        <form onSubmit={this.handleSubmit}>
          <div id="search-form">
              <select className="search-button" name="type" value={this.state.type} onChange={this.handleChange}>
                <option value="q">All</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
              </select>
              <input id="search-bar" name="search" type="text" onChange={this.handleChange}/>
            <div>
              <button className="search-button"type="submit"><i class="fas fa-search"></i></button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (searchQuery, type) => dispatch(getSearchedBooks(searchQuery, type))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm)

