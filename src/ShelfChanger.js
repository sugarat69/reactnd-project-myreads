import React, { Component } from "react";

class ShelfChanger extends Component {
  constructor(props) {
    super(props);

    // construct options list, must move current shelf option to top
    const options = [
      <option value="move" key="move" disabled>
        Move to...
      </option>,
      <option value={props.shelfKey} key={props.shelfKey}>
        {props.shelves[props.shelfKey]}
      </option>
    ];

    // filter current shelf from rest of shelves
    const otherShelves = Object.keys(props.shelves)
      .filter(shelfKey => {
        return shelfKey !== props.shelfKey ? shelfKey : null;
      })
      .map(shelfKey => (
        <option value={shelfKey} key={shelfKey}>
          {props.shelves[shelfKey]}
        </option>
      ));

    // push other shelf options
    Array.prototype.push.apply(options, otherShelves);

    // push None option
    options.push(
      <option value="none" key="none">
        None
      </option>
    );

    this.options = options;
  }
  render() {
    return (
      <div className="book-shelf-changer">
        <select
          onChange={event => this.props.changeHandler(event.target.value)}
        >
          {this.options}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
