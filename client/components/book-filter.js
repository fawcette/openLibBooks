import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setFilterDateRange} from '../store'

/**
 * COMPONENT
 */
class BookFilter extends React.Component {

  constructor () {
    super()
    this.state = {
      year_start: 0,
      year_end: new Date().getFullYear()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.setDateRange(parseInt(this.state.year_start, 10), parseInt(this.state.year_end, 10)) 
  }
  render () {
    return (
      <div>
        Filter By:
        <form onSubmit={this.handleSubmit}>
          Year Start: 
          <input type="text" name="year_start" onChange={this.handleChange} />
          Year End:
          <input type="text" name="year_end" onChange={this.handleChange} />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
}


const mapDispatchToProps = (dispatch) => {
  return {
    setDateRange: (startYear, endYear) => dispatch(setFilterDateRange(startYear, endYear))
  }
}

export default connect(null, mapDispatchToProps)(BookFilter)

/**
 * PROP TYPES
 */
BookFilter.propTypes = {
}
