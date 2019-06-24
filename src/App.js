import React from 'react'
import {Route, Link} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header.js'
import Bookshelf from './Bookshelf.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" render={(history) => (
		  <div className="list-books">
			<Header />
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" id="currentlyReading"/>
          		<Bookshelf title="Want to Read" id="wantToRead"/>
          		<Bookshelf title="Read" id="read"/>
              </div>
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
