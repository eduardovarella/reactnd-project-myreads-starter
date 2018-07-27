import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
import * as BooksAPI from '../../BooksAPI'
import Book from '../common/Book';

class SearchScreen extends Component {

    state = {
        loadind: false,
        books: []
    }

    clearList() {
        this.setState({loading: false, books: []});
    }

    prepareList(books){

        const { booksOnShelfs } = this.props;
        
        let preparedBooks = books.map((book) => {

            book.shelf = 'none';
            let booksFound = booksOnShelfs.filter((bookOnShelf) => bookOnShelf.id === book.id);
            if(booksFound.length > 0)
            {
                book.shelf = booksFound[0].shelf;
            }
            
            return book;
        }); 

        this.setState({ loading: false, books: preparedBooks });
    }

    handleSearch = (e) => {

        this.setState({ loading: true });

        var searchKey = e.target.value;
        if(searchKey === "")
        {
            this.clearList();
        }
        else
        {
            BooksAPI.search(searchKey).then((data) => {
                if(data.error) {
                    this.clearList();
                }
                else {
                    this.prepareList(data)
                }
                
            });
        }
    }

    render() {

        const { onBookUpdate } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>

                </div>
                </div>
                <div className="search-books-results">
                { this.state.loading && (<ReactLoading type="bars" color="#dedede" height={'30px'} width={'30px'} className="loading" />)}
                { !this.state.loading && (
                <ol className="books-grid">
                    {
                        this.state.books.map((book) => (
                            <Book key={book.id} book={book} onBookUpdate={onBookUpdate}/>
                        ))
                    }
                </ol>
                )}
                    
                </div>
            </div>
        )
    }
}

export default SearchScreen