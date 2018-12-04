import React from "react";
import PropTypes from "prop-types";

import Book from "./Book";

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelves[props.shelfKey]}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => (
          <li key={book.id}>
            <Book
              bookInfo={book}
              shelfKey={props.shelfKey}
              changeBookShelfHandler={changeInfo =>
                props.changeBookShelfHandler(changeInfo)
              }
              shelves={props.shelves}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  shelves: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  shelfKey: PropTypes.string.isRequired,
  changeBookShelfHandler: PropTypes.func.isRequired
};

export default BookShelf;
