import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  constructor(props) {
  	super(props);
	this.state = { shelf: this.props.book.shelf};
  }
  
  handleChange = (e) => {
    this.setState({
    	shelf: e.target.value
    });
    this.props.onChangeShelf(this.props.book, e.target.value);
  }
  
  render() {
    return (
      <div className="book">
          <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: (this.props.book.imageLinks && `url("${this.props.book.imageLinks.smallThumbnail}")`) }}></div>
              <div className="book-shelf-changer">
                  <select onChange={this.handleChange} name="shelf" value={this.state.shelf}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
              </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors && this.props.book.authors.join(', ')}</div>
      </div>  
    )
  }
}

export default Book;