import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  state = { query: '', books: [] };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState(
      () => ({ query: value }),
      () => {
        BooksAPI.search(this.state.query).then((books) => {
          const filteredBooks = this.props.filteredBooks();
          this.updateShelf(books, filteredBooks);
          this.setState(() => ({
            books: books && books.length > 0 ? books : [],
          }));
        });
      }
    );
  };
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
          <Link to='/listmybooks' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
      
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
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
