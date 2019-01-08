import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SearchForm, BookFilters} from '.'
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
        <BookFilters />
        {this.props.books.map((book) => (
          <p key={book.key}>{`${book.title}`}</p>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let books = state.books
  let sortType = state.sortType
  if (state.sortType === 'title') {
    books.sort((a, b) => {
      if (a.title > b.title) {
        return 1
      }
      else if(a.title < b.title) {
        return -1
      } else {
        return 0
      }
    })
  }
  return {
    books,
    sortType
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
