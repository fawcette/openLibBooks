import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SearchForm, BookSort, BookFilter} from '.'
import {getSingleBook} from '../store'

/**
 * COMPONENT
 */
class SingleBook extends React.Component {

  constructor() {
    super()
    this.apiCoverUrl = 'http://covers.openlibrary.org/'
  }

  componentDidMount() {
    this.props.getBook(this.props.match.params.id)
  }

  render () {
    //if (this.props.book) console.log(this.props.book.details)
    let book = {}
    if(this.props.book) {
    if (this.props.match.params.id.slice(0, 2) == 'OL') {
        book = this.props.book
    } else {
        book = this.props.book.details
    }
}
    return (
      book ? <div>
        <h3>{book.title}</h3>
        <img src={`${this.apiCoverUrl}b/isbn/${this.props.match.params.id}-L.jpg?default=false`} />
        <p>Description: {book.description ? book.description : 'Unavailable'}</p>
      </div>  :
      <div />
      
    )
  }
}

const mapStateToProps = (state) => {
    return {
        book: state.singleBook
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getBook: (id) => dispatch(getSingleBook(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
  
/**
 * PROP TYPES
 */
SingleBook.propTypes = {
}
