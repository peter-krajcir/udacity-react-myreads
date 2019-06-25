import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header.js'
import Bookshelf from './Bookshelf.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
  	books: [],
    loaded: false
  };
  
  componentDidMount() {
    BooksAPI.getAll() 
    .then((books) => (
    	this.setState((currentState) => ({
        	books,
            loaded: true
        }))
    ))
  }

  changeShelf = (book, newShelf) => {
    book.shelf = newShelf;
    // if the user selected None in the dropdown, let's remove the book from the bookshelf
    if (newShelf === 'none') {
      this.setState(currentState => ({
          books: [...currentState.books.filter(b=>b.id !== book.id)]
      }));
    } else {
      this.setState(currentState => ({
          books: [...currentState.books.filter(b=>b.id !== book.id), book]
      }));
    }
    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={(history)=> (
    		<Search onChangeShelf={this.changeShelf} books={this.state.books}/>
    	)} />
        <Route exact path="/" render={(history) => (
		  <div className="list-books">
			<Header />
            <div className="list-books-content">
              {this.state.books.length === 0 && !this.state.loaded ? (<h3>Loading books... Please wait</h3>) : 
              <div>
                <Bookshelf title="Currently Reading" id="currentlyReading" onChangeShelf={this.changeShelf} books={this.state.books.filter((book) => (book.shelf === "currentlyReading"))}/>
          		<Bookshelf title="Want to Read" id="wantToRead" onChangeShelf={this.changeShelf} books={this.state.books.filter((book) => (book.shelf === "wantToRead"))}/>
          		<Bookshelf title="Read" id="read" onChangeShelf={this.changeShelf} books={this.state.books.filter((book) => (book.shelf === "read"))}/>
              </div>
			}
            </div>
            <div className="open-search">
          	  <Link to="/search">Add a book</Link>
            </div>
          </div>        
        )} />
      </div>
    )
  }
}

export default BooksApp
