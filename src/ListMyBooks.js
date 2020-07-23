import React, { Component } from 'react';
import ListBooks from './ListBooks';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Fetch books to display in the shelves.
class ListMyBooks extends Component {
  state = { shelves: ['currentlyReading', 'wantToRead', 'read'] };

  render() {
    const { fetchBooksFromShelves, updateBookShelf } = this.props;
    return (
      <div>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Currently Reading</h2>
          <ol className='books-grid'>
            <ListBooks
              books={fetchBooksFromShelves(this.state.shelves[0])}
              updateBookShelf={updateBookShelf}
            />
          </ol>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Want to Read</h2>
          <ol className='books-grid'>
            <ListBooks
              books={this.props.fetchBooksFromShelves(this.state.shelves[1])}
              updateBookShelf={updateBookShelf}
            />
          </ol>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Read</h2>
          <ol className='books-grid'>
            <ListBooks
              books={this.props.fetchBooksFromShelves(this.state.shelves[2])}
              updateBookShelf={updateBookShelf}
            />
          </ol>
        </div>
        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

ListMyBooks.propTypes = {
  fetchBooksFromShelves: PropTypes.func.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default ListMyBooks;
