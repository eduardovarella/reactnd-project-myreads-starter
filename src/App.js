import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomeScreen from './components/screens/HomeScreen';
import SearchScreen from './components/screens/SearchScreen';
import { Route } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    books: []
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.loadBooks();
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((book) => {
      this.loadBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomeScreen books={ this.state.books } onBookUpdate={this.updateBook} />
        )}/>
        <Route path="/search" render={() => (
          <SearchScreen />
        )}/>
      </div>
    )
  }
}

export default BooksApp
