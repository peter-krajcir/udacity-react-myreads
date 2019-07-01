import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
  const handleChange = (e) => {
    console.log(props);
	props.onChangeShelf(props.book, e.target.value);  
  }
  
/* 
When there is no imageLinks property, the div's backgroundImage is empty 
React handles the change of the dropdown
when there's no authors property, it is not displyed 
*/  
  return (
      <div className="book">
          <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: (props.book.imageLinks && `url("${props.book.imageLinks.smallThumbnail}")`) }}></div>
              <div className="book-shelf-changer">
                  <select onChange={handleChange} name="shelf" value={props.book.shelf}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
              </div>
          </div>
          <div className="book-title">{props.book.title}</div>
          <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
      </div>  
    )  
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Book;