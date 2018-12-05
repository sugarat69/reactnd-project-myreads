import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

const BooksList = props => {
  // sort books into shelves
  const emptyShelves = Object.keys(props.shelves).reduce(
    (accumulator, shelfKey) => {
      accumulator[shelfKey] = [];
      return accumulator;
    },
    {}
  );

  const shelves = props.shelfContents.reduce((accumulator, book) => {
    accumulator[book.shelf].push(book);
    return accumulator;
  }, emptyShelves);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map(shelfKey => (
            <BookShelf
              books={shelves[shelfKey]}
              shelfKey={shelfKey}
              changeBookShelfHandler={changeInfo =>
                props.changeBookShelfHandler(changeInfo)
              }
              shelves={props.shelves}
              key={shelfKey}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  shelves: PropTypes.object.isRequired,
  shelfContents: PropTypes.array.isRequired,
  changeBookShelfHandler: PropTypes.func.isRequired
};

export default BooksList;
