import React from 'react'
import Book from './Book.js'

const Bookshelf = ({title, id, books, onChangeShelf}) => {
  const changeShelf = (book, newShelf) => {
      onChangeShelf(book, newShelf);
  }

  return (
	<div className="bookshelf">
    	<h2 className="bookshelf-title">{title}</h2>
    	<div className="bookshelf-books">
{books.length === 0 ? <h3>No books in this section</h3> :
    		<ol className="books-grid">
				{books.map(book => {
                 	return (<li key={book.id}>
						<Book book={book} onChangeShelf={changeShelf}/>
					</li>);
				})}
			</ol>
}
		</div>
	</div>  
  )
}

export default Bookshelf;