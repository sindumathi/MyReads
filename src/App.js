import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListMyBooks from './ListMyBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = { books: [], shelves: {}, filteredBooks: [] };

  componentDidMount() {
    this.getBookList();
  }

  getBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }));
    });
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      book.shelf = shelf;
      this.setState({ shelves });
      this.getBookList();
    });
  };

  filteredBooks = () => {
    return this.state.books.filter((book) => book.shelf && book.shelf !== '');
  };

  fetchBooksFromShelves = (shelves) => {
    const books = this.state.books.filter(
      (book) => book.shelf && book.shelf === shelves
    );
    return books;
  };
  render() {
    return (
      <div className='app'>
        <Route exact path='/search'>
          <SearchBooks
            updateBookShelf={this.updateBookShelf}
            searchBooks={this.searchBooks}
            filteredBooks={this.filteredBooks}
          />
        </Route>
        <div className='list-books'>
          <div className='list-books-content'>
            <Route path='/listmybooks'>
              <ListMyBooks
                fetchBooksFromShelves={this.fetchBooksFromShelves}
                updateBookShelf={this.updateBookShelf}
              />
            </Route>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
