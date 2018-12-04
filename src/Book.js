import React, { Component } from "react";
import ShelfChanger from "./ShelfChanger";

class Book extends Component {
  changeBookShelfHandler(newShelfKey) {
    this.props.changeBookShelfHandler({
      destination: newShelfKey,
      book: this.props.bookInfo
    });
  }
  render() {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url("${
                  this.props.bookInfo.imageLinks.thumbnail
                }")`
              }}
            />
            <ShelfChanger
              changeBookShelfHandler={newShelfKey =>
                this.changeBookShelfHandler(newShelfKey)
              }
              shelfKey={this.props.shelfKey}
              shelves={this.props.shelves}
            />
          </div>
          <div className="book-title">{this.props.bookInfo.title}</div>
          <div className="book-authors">{this.props.bookInfo.authors}</div>
        </div>
      </div>
    );
  }
}

export default Book;
