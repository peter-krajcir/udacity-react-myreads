import React from 'react'
import {Link} from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h2>The page doesn't exist</h2>
      <Link to="/">Go to main page</Link>
    </div>
  )
}

export default NoMatch;