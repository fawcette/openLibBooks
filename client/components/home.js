import React from 'react'
import {Link} from 'react-router-dom'
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
        {this.props.books.map((book) => {
          let isbn = (book.isbn) ? book.isbn[0] : null
          let olid = book.key
          let path = (isbn) ? '/works/' + isbn : olid
          return <Link key={book.key} to={{pathname: path}}>
                    <p key={book.key}>{`${book.title} ${book.first_publish_year}`}</p>
                  </Link>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let books = [...state.books]
  let sortType = state.sortType
  let filterDateRange = state.filterDateRange
  let filterLanguageDict = state.filterLanguage

  books = books.filter((book) => {
    let includedInYearFilter = book.first_publish_year >= filterDateRange.startYear && book.first_publish_year <= filterDateRange.endYear
    let includedInLangFilter = Object.keys(filterLanguageDict).length === 0
    if (filterLanguageDict && Object.keys(filterLanguageDict).length && book.language) {
      for (let i = 0; i < book.language.length; i++) {
        if (filterLanguageDict[book.language[i]] === true) {
          includedInLangFilter = true
          break
        }
      }
  }
    return includedInYearFilter && includedInLangFilter
  })

  if (state.sortType !== 'none') {
    books.sort((a, b) => {
      a = (a[sortType] !== undefined && typeof a[sortType].toLowerCase === "function") ? a[sortType].toLowerCase() : a[sortType]
      b = (b[sortType] !== undefined && typeof b[sortType].toLowerCase === "function") ? b[sortType].toLowerCase() : b[sortType]
      if (a === undefined || a > b) {
        return 1
      }
      else if (b === undefined || a < b) {
        return -1
      } else {
        return 0
      }
    })
  }
  return {
    books,
    sortType,
    filterDateRange,
    filterLanguageDict
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
