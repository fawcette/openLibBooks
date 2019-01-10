import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home, SingleBook} from './components'

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
