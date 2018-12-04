import React from "react";
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

export default BookShelf;
