import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Book from './Book';

class BookShelf extends Component {
    
    render() {
        const { title, books, onBookUpdate, loading } = this.props

        return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                { loading && (<ReactLoading type="bars" color="#dedede" height={'30px'} width={'30px'} className="loading" />)}
                { !loading && books.length > 0 && (
                <ol className="books-grid">
                  {
                    books.map((book) => (
                      <Book key={book.id} book={book} onBookUpdate={onBookUpdate}/>
                    ))
                  }
                </ol>
                )}
                { !loading && books.length === 0 && (
                    <span className="bookshelf-empyt-message">No books on this shelf.</span>
                  )
                }
              </div>
            </div>
        )
    }
}

export default BookShelf