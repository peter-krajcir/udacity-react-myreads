import React from 'react'
import PropTypes from 'prop-types'

const Book = ({title, author, cover}) => {
  return (
	<div className="book">
		<div className="book-top">
			<div className="book-cover" style={{ width: cover.width, height: cover.height, backgroundImage: `url("${cover.url}")` }}></div>
    		<div className="book-shelf-changer">
    			<select>
					<option value="move" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
    		</div>
    	</div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
    </div>  
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired
}

export default Book;