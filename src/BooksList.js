import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

const BooksList = props => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {Object.keys(props.shelves).map(shelfKey => (
          <BookShelf
            books={props.shelfContents[shelfKey]}
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

BooksList.propTypes = {
  shelves: PropTypes.object.isRequired,
  shelfContents: PropTypes.object.isRequired,
  changeBookShelfHandler: PropTypes.func.isRequired
};

export default BooksList;
