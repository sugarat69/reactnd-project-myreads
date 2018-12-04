import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

class BooksList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.props.shelves).map(shelfKey => (
              <BookShelf
                books={this.props.shelfContents[shelfKey]}
                shelfKey={shelfKey}
                changeBookShelfHandler={changeInfo =>
                  this.props.changeBookShelfHandler(changeInfo)
                }
                shelves={this.props.shelves}
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
  }
}

export default BooksList;
