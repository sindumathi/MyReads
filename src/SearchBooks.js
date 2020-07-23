import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  state = { query: '', books: [] };

  //Controlled Component: Added search query to state and fetch books in call back based on the search text.
  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState(
      () => ({ query: value }),
      () => {
        if (this.state.query) {
          BooksAPI.search(this.state.query).then((books) => {
            const filteredBooks = this.props.filteredBooks();
            books && !books.error && this.updateShelf(books, filteredBooks);
            this.setState(() => ({
              books: books && books.length > 0 ? books : [],
            }));
          });
        } else {
          this.setState(() => ({
            books: [],
          }));
        }
      }
    );
  };

  //Update Book Shelf
  updateShelf = (books, filteredBooks) => {
    filteredBooks.forEach((fbook) => {
      const book = books.find((book) => {
        return book.id === fbook.id;
      });
      if (book) {
        book.shelf = fbook.shelf;
      }
    });
  };

  render() {
    const { books, query } = this.state;
    const { updateBookShelf } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            <ListBooks books={books} updateBookShelf={updateBookShelf} />
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  updateBookShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
