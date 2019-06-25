import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'

class Search extends Component {
  state = {
  	search: '',
    searchBooks: []
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    }); 
  }

// if we already have book in the collection, display correct shelf in the dropdown
  getCorrectShelf = (book) => {
    const bookAlreadyInShelf = this.props.books.filter(b => b.id === book.id);
    return (bookAlreadyInShelf.length === 0 ? 'none' : bookAlreadyInShelf[0].shelf);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    BooksAPI.search(this.state.search, 20)
    .then(searchBooks => {
      if (searchBooks.items && searchBooks.items.length === 0) {
        this.setState(currentState => ({
        	searchBooks: []
        }))
      } else {
        const updatedSearchBooks = searchBooks.map(book => ({...book, shelf: this.getCorrectShelf(book) }));
        this.setState(currentState =>
          ({searchBooks: updatedSearchBooks}))
      }
    });
  }
  
  changeShelf = (book, newShelf) => {
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

export default Search;