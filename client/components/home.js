import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {BookSort, BookFilter} from '.'
import {getSearchedBooks} from '../store'

/**
 * COMPONENT
 */
class Home extends React.Component {

  //Displays the filter and sort features and will display a list of searched book results
  render () {
    return (
      <div>
        <div id="page-content">
        <BookFilter />
        <div id="search-results-container">
          <BookSort />
          Results:
          {this.props.books.map((book) => {
            let isbn = (book.isbn) ? book.isbn[0] : null
            let olid = book.key
            let path = (isbn) ? '/works/' + isbn : olid
            return <Link key={book.key} to={{pathname: path}}>
                      <p key={book.key}>{<strong>{book.title}</strong>},{` first publish year:${book.first_publish_year}, languages:${book.language}`}</p>
                    </Link>
          })}
          </div>
        </div>
      </div>
    )
  }
}

//Removes books from local state if they do not fulfill user specified filters
const filterBooks = (books, filterDateRange, filterLanguageDict) => {
  return books.filter((book) => {
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
}

//Sorts books in a user specified order
const sortBooks = (books, sortType) => {
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

const mapStateToProps = (state) => {
  let books = [...state.books]
  let sortType = state.sortType
  let filterDateRange = state.filterDateRange
  let filterLanguageDict = state.filterLanguage

  books = filterBooks(books, filterDateRange, filterLanguageDict)

  if (state.sortType !== 'none') {
    sortBooks(books, sortType)
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
