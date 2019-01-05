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

  componentDidMount() {
    /*const res = await axios.get('http://openlibrary.org/search.json?q=alice')
      //'http://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&jscmd=data&format=json')
    console.log(res.data)*/
    this.props.getBooks('alice')
    console.log(this.state + 'the state?')
  }

  /*{this.props.books.map((book, idx) => (
          <p key={idx}>{`${book}`}</p>
        ))}
  */
  
  render() {
    console.log('the state' + this.state)
    console.log(this)
    
    return (
      <div>
        <h3>Welcome</h3>
        <SearchForm />
        {this.props.books.map((book, idx) => (
          <p key={idx}>{`${book.title}`}</p>
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
