import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SearchForm} from '.'
import axios from 'axios'
import {getSearchedBooks} from '../store'

/**
 * COMPONENT
 */
class Home extends React.Component {

  constructor() {
    super()
  }

  render () {
    
    return (
      <div>
        <h3>Welcome</h3>
        <SearchForm />
        {this.props.books.map((book) => (
          <p key={book.key}>{`${book.title}`}</p>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (searchQuery) => dispatch(getSearchedBooks(searchQuery))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
}
