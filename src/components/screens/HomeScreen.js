import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from '../common/BookShelf';

class HomeScreen extends Component {

  booksByShelf = (shelf) => {
    return this.props.books.filter((book) => book.shelf === shelf);
  }

  render() {
    const { onBookUpdate } = this.props
    
    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              title="Currently Reading" 
              books={this.booksByShelf('currentlyReading')}
              onBookUpdate={onBookUpdate}/>
            <BookShelf 
              title="Want to Read" 
              books={this.booksByShelf('wantToRead')}
              onBookUpdate={onBookUpdate}/>
            <BookShelf 
              title="Read" 
              books={this.booksByShelf('read')}
              onBookUpdate={onBookUpdate}/>
          </div>
        </div>
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default HomeScreen