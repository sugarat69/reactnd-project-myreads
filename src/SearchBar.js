import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { search } from "./BooksAPI";
import Book from "./Book";

const SearchBar = props => {
  const handleQueryChange = value => {
    props.updateSearchQuery(value);
    search(value)
      .then(data => {
        if (!data) {
          console.log("no data returned from search");
          props.updateSearchResults([]);
        } else if (data.error) {
          console.log(data);
          props.updateSearchResults([]);
        } else {
          // filter out books with missing thumbnails
          const booksWithImages = data.filter(
            book => book.imageLinks && book.imageLinks.thumbnail
          );
          props.updateSearchResults(booksWithImages);
        }
      })
      .catch(err => {
        console.log(err);
        props.updateSearchResults([], value);
      });
  };

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
            value={props.searchInfo.query}
            onChange={event => handleQueryChange(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.searchInfo.results.map(book => (
            <li key={book.id}>
              <Book
                bookInfo={book}
                changeBookShelfHandler={changeInfo =>
                  props.changeBookShelfHandler(changeInfo)
                }
                shelves={props.shelves}
                shelfKey={props.findShelfForBook(book)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  shelves: PropTypes.object.isRequired,
  searchInfo: PropTypes.object.isRequired,
  changeBookShelfHandler: PropTypes.func.isRequired,
  findShelfForBook: PropTypes.func.isRequired,
  updateSearchResults: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired
};

export default SearchBar;
