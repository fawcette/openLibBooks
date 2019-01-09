import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SearchForm, BookSort, BookFilter} from '.'
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
        <BookSort />
        <BookFilter />
        {this.props.books.map((book) => (
          <p key={book.key}>{`${book.title} ${book.first_publish_year}`}</p>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let books = [...state.books]
  let sortType = state.sortType
  let filterDateRange = state.filterDateRange

  books = books.filter((book) => 
    book.first_publish_year >= filterDateRange.startYear && book.first_publish_year <= filterDateRange.endYear
  )

  if (state.sortType !== 'none') {
    books.sort((a, b) => {
      a = (a[sortType] !== undefined && typeof a[sortType].toLowerCase === "function") ? a[sortType].toLowerCase() : a[sortType]
      b = (b[sortType] !== undefined && typeof b[sortType].toLowerCase === "function") ? b[sortType].toLowerCase() : b[sortType]
      if (a === undefined || a > b) {
        return 1
      }
      else if(b === undefined || a < b) {
        return -1
      } else {
        return 0
      }
    })
  }
  return {
    books,
    sortType,
    filterDateRange
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
