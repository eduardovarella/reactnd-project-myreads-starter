import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomeScreen from './components/screens/HomeScreen';
import SearchScreen from './components/screens/SearchScreen';
import { Route } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    loading: true,
    books: []
  }

  loadBooks() {
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
      this.setState({ loading: false, books });
    });
  }

  componentDidMount() {
    this.loadBooks();
  }

  updateBook = (book, shelf) => {
    this.setState({ loading: true });
    BooksAPI.update(book, shelf).then((book) => {
      this.loadBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomeScreen books={ this.state.books } onBookUpdate={this.updateBook} loading={this.state.loading} />
        )}/>
        <Route path="/search" render={() => (
          <SearchScreen booksOnShelfs={ this.state.books } onBookUpdate={this.updateBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
