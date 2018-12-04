import React, { Component } from "react";

class ShelfChanger extends Component {
  render() {
    // construct options list
    const options = [
      <option value="move" key="move" disabled>
        Move to...
      </option>
    ];

    // must move current shelf option to top (unless we are in search)
    if (this.props.shelfKey) {
      options.push(
        <option value={this.props.shelfKey} key={this.props.shelfKey}>
          {this.props.shelves[this.props.shelfKey]}
        </option>
      );
    } else {
      // in search, book not on shelf yet, None is default
      options.push(
        <option value="none" key="none">
          None
        </option>
      );
    }

    // create array for rest of shelves, filtering current shelf if necessary
    const otherShelves = Object.keys(this.props.shelves)
      .filter(shelfKey => shelfKey !== this.props.shelfKey)
      .map(shelfKey => (
        <option value={shelfKey} key={shelfKey}>
          {this.props.shelves[shelfKey]}
        </option>
      ));

    // add other shelf options to bottom of list
    Array.prototype.push.apply(options, otherShelves);

    // add None option to bottom if not in search results

    if (this.props.shelfKey) {
      options.push(
        <option value="none" key="none">
          None
        </option>
      );
    }

    return (
      <div className="book-shelf-changer">
        <select
          onChange={event =>
            this.props.changeBookShelfHandler(event.target.value)
          }
        >
          {options}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
