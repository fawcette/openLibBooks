import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => (
  <div>
    <h1>Open Library Books</h1>
    <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
    </nav>
    <hr />
  </div>
)

export default Navbar

/**
 * PROP TYPES
 */
Navbar.propTypes = {
}
