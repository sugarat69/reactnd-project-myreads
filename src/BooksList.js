import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

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

export default BooksList;
