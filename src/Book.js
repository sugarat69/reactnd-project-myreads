import React, { Component } from "react";
import ShelfChanger from "./ShelfChanger";

class Book extends Component {
  changeBookShelfHandler(shelfKey) {
    const changeInfo = {
      destination: shelfKey,
      book: this.props.bookInfo
    };
    this.props.changeHandler(changeInfo);
  }
  render() {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: this.props.bookInfo.image.width,
                height: this.props.bookInfo.image.height,
                backgroundImage: `url("${this.props.bookInfo.image.url}")`
              }}
            />
            <ShelfChanger
              changeHandler={shelfKey => this.changeBookShelfHandler(shelfKey)}
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
