import React from "react";
import ShelfChanger from "./ShelfChanger";

const Book = props => (
  <div>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url("${props.bookInfo.imageLinks.thumbnail}")`
          }}
        />
        <ShelfChanger
          changeBookShelfHandler={newShelfKey => {
            props.changeBookShelfHandler({
              destination: newShelfKey,
              book: props.bookInfo
            });
          }}
          shelfKey={props.shelfKey}
          shelves={props.shelves}
        />
      </div>
      <div className="book-title">{props.bookInfo.title}</div>
      <div className="book-authors">{props.bookInfo.authors}</div>
    </div>
  </div>
);

export default Book;
