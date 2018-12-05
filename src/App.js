import React, { Component } from "react";
import { Route } from "react-router-dom";

import { getAll, update } from "./BooksAPI";
import SearchBar from "./SearchBar";
import BooksList from "./BooksList";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.shelves = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };

    this.state = {
      allBooks: [],
      search: {
        results: [],
        query: ""
      }
    };
  }
  changeBookShelfHandler(changeInfo) {
    const currentShelf = this.findShelfForBook(changeInfo.book);

    if (currentShelf === changeInfo.destination) {
      // user selected the shelf that the book is currently on, do nothing
      return;
    }

    update(changeInfo.book, changeInfo.destination)
      .then(results => {
        this.fetchAllBooks();
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSearchQuery(query) {
    this.setState(prevState => {
      prevState.search.query = query;
      return prevState;
    });
  }
  updateSearchResults(results) {
    this.setState(prevState => {
      prevState.search.results = results;
      return prevState;
    });
  }

  // this function used here as well as ShelfChanger component
  // search specified book and return its current shelf
  findShelfForBook(book) {
    const bookInShelf = this.state.allBooks.find(
      currentBook => currentBook.id === book.id
    );

    return bookInShelf ? bookInShelf.shelf : "";
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
              shelfContents={this.state.allBooks}
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
              findShelfForBook={book => this.findShelfForBook(book)}
              updateSearchResults={newResults =>
                this.updateSearchResults(newResults)
              }
              updateSearchQuery={query => this.updateSearchQuery(query)}
            />
          )}
        />
      </div>
    );
  }

  fetchAllBooks() {
    getAll()
      .then(results => {
        this.setState(prevState => {
          prevState.allBooks = results;
          return prevState;
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.fetchAllBooks();
  }
}

export default App;
