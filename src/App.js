import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListMyBooks from './ListMyBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = { books: [], shelves: {} };

  componentDidMount() {
    this.getBookList();
  }

  getBookList = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ books }));
    });
  };

  //updating the book shelf
  //Reload the books and updates the state.
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelves) => {
      book.shelf = shelf;
      this.setState({ shelves });
      this.getBookList();
    });
  };

  //fetching books which is added to shelf to reflect the books shelf in search page
  filteredBooks = () => {
    return this.state.books.filter((book) => book.shelf && book.shelf !== '');
  };

  //Main page: fetch books to display in its shelves
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
            <Route exact path='/'>
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
