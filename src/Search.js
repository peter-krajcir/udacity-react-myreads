import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    // search Input
  	search: '',
    // books return from API when searching for them
    searchBooks: []
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
    
    // if there's a search string, let's query API by using helper method findBooksByText
    // otherwise don't display anything
	(e.target.value === '' ? this.setState({searchBooks: []}) : this.findBooksByText(e.target.value));
  }

// if we already have book in the collection, display correct shelf in the dropdown
  getCorrectShelf = (book) => {
    const bookAlreadyInShelf = this.props.books.filter(b => b.id === book.id);
    return (bookAlreadyInShelf.length === 0 ? 'none' : bookAlreadyInShelf[0].shelf);
  }

  findBooksByText = (text) => {
    BooksAPI.search(text, 20)
    .then(searchBooks => {
      if (searchBooks.items && searchBooks.items.length === 0) {
        // 0 books returned from API
        this.setState(currentState => ({
        	searchBooks: []
        }))
      } else {
        // the data coming from API don't have shelf property, use helper method getCorrectShelf to find the correct value for the property and attach it to the book object
        const updatedSearchBooks = searchBooks.map(book => ({...book, shelf: this.getCorrectShelf(book) }));
        // assign found books from API with correct shelf information to state and render
        this.setState(currentState =>
          ({searchBooks: updatedSearchBooks}))
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
	this.findBooksByText(this.state.search);
  }
  
  changeShelf = (book, newShelf) => {
    // using changeShelf from App.js when the user changes the bookshelf
    this.props.onChangeShelf(book, newShelf);
  }

  render() {
    return (
      <div className="search-books">
          <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                  <form onSubmit={this.handleSubmit}>
                      <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleChange}/>
                  </form>
              </div>
          </div>
          <div className="search-books-results">
              <ol className="books-grid">
				{this.state.searchBooks.map(book => {
                 	return (<li key={book.id}>
						<Book book={book} onChangeShelf={this.changeShelf}/>
					</li>);
				})}
			  </ol>
          </div>
      </div>  
    )
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Search;