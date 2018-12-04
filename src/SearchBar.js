import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";

class SearchBar extends Component {
  handleQueryChange(value) {
    search(value)
      .then(data => {
        if (!data) {
          console.log("no data returned from search");
          this.props.updateSearchResults([], value);
        } else if (data.error) {
          console.log(data);
          this.props.updateSearchResults([], value);
        } else {
          this.props.updateSearchResults(data, value);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.updateSearchResults([], value);
      });
  }
  changeBookShelfHandler(changeInfo) {
    this.props.changeBookShelfHandler(changeInfo);
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.searchInfo.query}
              onChange={event => this.handleQueryChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchInfo.results.map(book => (
              <li key={book.id}>
                <Book
                  bookInfo={book}
                  changeBookShelfHandler={changeInfo =>
                    this.changeBookShelfHandler(changeInfo)
                  }
                  shelves={this.props.shelves}
                  shelfKey={this.props.findBookInShelves(book)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar;
