import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
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
    let book = {}
    if (this.props.book) {
        if (this.props.match.params.id.slice(0, 2) == 'OL') {
            book = this.props.book
        } else {
            book = this.props.book.details
        }
    }
    return (
        <div id="single-book-container">
            {book ? 
                <div>
                    <h3>{book.title ? book.title : "Unavailable"}</h3>
                    <img src={`${this.apiCoverUrl}b/isbn/${this.props.match.params.id}-L.jpg?default=false`} />
                    <p>Description: {book.description ? book.description : 'Unavailable'}</p>
                    <p># of Pages: {book.number_of_pages ? book.number_of_pages : "Unavailable"}</p>
                </div> :
                <div/>
            }
            <Link to="/">Back to Result Page</Link>
        </div>
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
