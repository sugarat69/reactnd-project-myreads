import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  changeBookShelfHandler(changeInfo) {
    changeInfo.source = this.props.shelfKey;
    this.props.changeHandler(changeInfo);
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelves[this.props.shelfKey]}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => {
              return (
                <li key={book.title}>
                  <Book
                    bookInfo={book}
                    changeHandler={changeInfo =>
                      this.changeBookShelfHandler(changeInfo)
                    }
                    shelfKey={this.props.shelfKey}
                    shelves={this.props.shelves}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
