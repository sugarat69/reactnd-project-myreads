import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelves[this.props.shelfKey]}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <Book
                  bookInfo={book}
                  shelfKey={this.props.shelfKey}
                  changeBookShelfHandler={changeInfo =>
                    this.props.changeBookShelfHandler(changeInfo)
                  }
                  shelves={this.props.shelves}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
