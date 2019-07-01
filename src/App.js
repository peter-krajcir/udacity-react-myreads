import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header.js'
import Bookshelf from './Bookshelf.js'
import Search from './Search.js'
import NoMatch from './NoMatch.js'

class BooksApp extends React.Component {
  state = {
    // contains all the books from our bookshelf
  	books: [],
    // flag whether the page was first time loaded - used for displaying Loading data.. label for the initial load
    loaded: false
  };
  
// loading the data for bookshelfs
  componentDidMount() {
    BooksAPI.getAll() 
    .then((books) => (
    	this.setState((currentState) => ({
        	books,
          // once the data are loaded, we hide Loading data label
            loaded: true
        }))
    ))
  }

// called from Book.js - to change the shelf for the selected book
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
    // let's save the change to backend
    BooksAPI.update(book, newShelf);
  }
// three Bookshelfs, we use arrow filter function to show only the books with corresponding shelf
  render() {
    return (
      <div className="app">
       <Switch>
          <Route path="/search" render={(history)=> (
              <Search onChangeShelf={this.changeShelf} books={this.state.books}/>
          )} />
          <Route exact path="/" render={(history) => (
            <div className="list-books">
              <Header title="MyReads"/>
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
          <Route component={NoMatch} />
		</Switch>
      </div>
    )
  }
}

export default BooksApp
