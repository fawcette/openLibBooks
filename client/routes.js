import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Home, SingleBook} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
  }

  render() {

    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/works/:id" component={SingleBook} />
      </Switch>
    )
  }
}


export default Routes

/**
 * PROP TYPES
 */
Routes.propTypes = {
}
