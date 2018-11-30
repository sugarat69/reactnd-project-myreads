import React, { Component } from "react";
import BookShelf from "./BookShelf";

class BooksList extends Component {
  state = {
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    },
    currentlyReading: [
      {
        title: "To Kill a Mockingbird",
        authors: "Harper Lee",
        image: {
          width: 128,
          height: 193,
          url:
            "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        }
      }
    ],
    wantToRead: [
      {
        title: "1776",
        authors: "David McCullough",
        image: {
          width: 128,
          height: 193,
          url:
            "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
        }
      }
    ],
    read: [
      {
        title: "Harry Potter and the Sorcerer's Stone",
        authors: "J.K. Rowling",
        image: {
          width: 128,
          height: 192,
          url:
            "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
        }
      }
    ]
  };

  changeBookShelfHandler(changeInfo) {
    if (changeInfo.source === changeInfo.destination) {
      // user selected the shelf that the book is currently on, do nothing
      return;
    }

    this.setState(prevState => {
      // remove book from current shelf
      prevState[changeInfo.source] = prevState[changeInfo.source].filter(book =>
        book.title !== changeInfo.book.title ? book : null
      );

      // add book to new shelf (if not set to none)
      if (changeInfo.destination !== "none") {
        prevState[changeInfo.destination].push(changeInfo.book);
      }

      return prevState;
    });
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.state.shelves).map(shelfKey => (
              <BookShelf
                books={this.state[shelfKey]}
                shelfKey={shelfKey}
                changeHandler={changeInfo =>
                  this.changeBookShelfHandler(changeInfo)
                }
                shelves={this.state.shelves}
                key={shelfKey}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default BooksList;
