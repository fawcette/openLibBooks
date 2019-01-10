import React from 'react'
import {Link} from 'react-router-dom'
import {SearchForm} from '.'

const Navbar = () => (
  <div id="header">
    <nav>
      <div id="logo">
        <Link to="/"><h3><i class="fas fa-book"></i> Open Library Books</h3></Link>
      </div>
      <div id="search-form">
        <SearchForm />
      </div>
    </nav>
  </div>
)

export default Navbar