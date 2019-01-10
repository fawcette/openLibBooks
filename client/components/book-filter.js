import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setFilterDateRange, setFilterLanguage} from '../store'

/**
 * COMPONENT
 */
class BookFilter extends React.Component {

  constructor () {
    super()
    this.state = {
      year_start: 0,
      year_end: new Date().getFullYear(),
      language_filter: {}
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange (event) {
    this.setState({[event.target.name] : event.target.value})
  }

  handleCheckChange (event) {
    let currLangFilterState = this.state.language_filter
    this.setState({language_filter: {...currLangFilterState, [event.target.value]: event.target.checked}})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.setDateRange(parseInt(this.state.year_start, 10), parseInt(this.state.year_end, 10))
    this.props.setLanguage(this.state.language_filter)
  }
  render () {
    let languageDict = this.props.languageDict
    return (
      <div>
        
        Filter By:
        <form onSubmit={this.handleSubmit}>
          Year Start: 
          <input type="text" name="year_start" onChange={this.handleTextChange} />
          Year End:
          <input type="text" name="year_end" onChange={this.handleTextChange} />
          <br />
          Languages:
          <div>
            {Object.keys(languageDict).map(language => {
              if (languageDict.hasOwnProperty(language)) return <div><label>{`${language}`}</label><input type="checkbox" name="language_filter" value={`${language}`} onChange={this.handleCheckChange} /></div>
            })}
          </div>
          <br />
          <input type="submit" value="submit" />
          

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let books = state.books
  let languageDict = {}
  for (let i = 0; i < books.length; i++) {
    if (books[i].language) {
      for(let j = 0; j < books[i].language.length; j++) {
        languageDict[books[i].language[j]] = true
      }
    }
  }
  return {
    languageDict,
    books
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setDateRange: (startYear, endYear) => dispatch(setFilterDateRange(startYear, endYear)),
    setLanguage: (languageDict) => dispatch(setFilterLanguage(languageDict))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookFilter)

/**
 * PROP TYPES
 */
BookFilter.propTypes = {
}
