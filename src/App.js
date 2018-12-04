import React, { Component } from "react";
import { Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import BooksList from "./BooksList";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    search: {
      results: [],
      query: ""
    }
  };

  constructor(props) {
    super(props);

    this.shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };
  }
  changeBookShelfHandler(changeInfo) {
    const currentShelf = this.findBookInShelves(changeInfo.book);

    if (currentShelf === changeInfo.destination) {
      // user selected the shelf that the book is currently on, do nothing
      return;
    }

    this.setState(prevState => {
      // remove book from current shelf (if necessary)
      if (currentShelf) {
        prevState.shelves[currentShelf] = prevState.shelves[
          currentShelf
        ].filter(book => (book.id !== changeInfo.book.id ? book : null));
      }

      // add book to new shelf (if not set to none)
      if (changeInfo.destination !== "none") {
        prevState.shelves[changeInfo.destination].push(changeInfo.book);
      }

      return prevState;
    });
  }

  updateSearchResults(results, query) {
    this.setState(prevState => {
      prevState.search = { results, query };
      return prevState;
    });
  }

  // this function used here as well as ShelfChanger component
  // search all bookshelves for specified book
  findBookInShelves(book) {
    return Object.keys(this.shelves).reduce((accumulator, currentShelfKey) => {
      if (accumulator) return accumulator; // book already found

      if (
        this.state.shelves[currentShelfKey].find(
          currentBook => currentBook.id === book.id
        )
      ) {
        return currentShelfKey;
      } else {
        return accumulator;
      }
    }, "");
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BooksList
              shelves={this.shelves}
              shelfContents={this.state.shelves}
              changeBookShelfHandler={changeInfo =>
                this.changeBookShelfHandler(changeInfo)
              }
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBar
              shelves={this.shelves}
              searchInfo={this.state.search}
              changeBookShelfHandler={changeInfo =>
                this.changeBookShelfHandler(changeInfo)
              }
              findBookInShelves={book => this.findBookInShelves(book)}
              updateSearchResults={(newResults, query) =>
                this.updateSearchResults(newResults, query)
              }
            />
          )}
        />
      </div>
    );
  }
}

export default App;
