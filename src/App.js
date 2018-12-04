import React, { Component } from "react";
import { Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import BooksList from "./BooksList";

// import * as BooksAPI from './BooksAPI'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };

    // load state from local storage (if any)
    const initialState = {
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
    try {
      const serializedState = localStorage.getItem("state");

      if (serializedState) {
        this.state = JSON.parse(serializedState);
      } else {
        this.state = initialState;
      }
    } catch (err) {
      this.state = initialState;
    }
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

  componentDidMount() {
    window.addEventListener("beforeunload", event => {
      event.preventDefault();

      try {
        const serializedState = JSON.stringify(this.state);
        localStorage.setItem("state", serializedState);
      } catch (err) {
        // ignore error
      }
      event.returnValue = "";
    });
  }
}

export default App;
