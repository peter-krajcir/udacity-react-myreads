import React from 'react';
import PropTypes from 'prop-types';

// Simple component to display Header of the application
const Header = ({title}) => {
	return (
      <div className="list-books-title">
          <h1>{title}</h1>
      </div>
    )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;