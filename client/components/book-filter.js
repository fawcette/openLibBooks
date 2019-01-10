import React from 'react'
import {connect} from 'react-redux'
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
      language_filter: {},
      show_language_filter: false
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleFilterCollapse = this.toggleFilterCollapse.bind(this)
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

  toggleFilterCollapse () {
    this.setState((state) => ({show_language_filter: !state.show_language_filter}))
  }

  //Renders and stores first published year and language filter options as local state
  render () {
    let languageDict = this.props.languageDict
    return (
      <div id="filter-container">
        <h4>Filters</h4>
        <label>Year Start:</label>
        <input className="filter-textbox" type="text" name="year_start" onChange={this.handleTextChange} />
        <label>Year End:</label>
        <input className="filter-textbox" type="text" name="year_end" onChange={this.handleTextChange} />
        <br />
        <br />
        <button id="filter-collapse" onClick={this.toggleFilterCollapse}>Languages +</button>
          <div>
            {this.state.show_language_filter ? 
              Object.keys(languageDict).map(language => {
                if (languageDict.hasOwnProperty(language)) return <div><label>{`${language}`}</label><input type="checkbox" name="language_filter" value={`${language}`} onChange={this.handleCheckChange} /></div>
              }) : 
              <div />}
          </div>
        <br />
        <button id="filter-submit" type="submit" onClick={this.handleSubmit} value="Apply Filters">Apply Filters</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let books = state.books
  let languageDict = {}
  for (let i = 0; i < books.length; i++) {
    if (books[i].language) {
      for (let j = 0; j < books[i].language.length; j++) {
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

