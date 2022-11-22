import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    eventCountInput: 50
  }


  handleNumber = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ eventCountInput: value });
  }


  render() {

    return (
      <div className="numberOfEvents">
        <label htmlFor="numberOfEvents" className="number-label">Show </label>
        {/* <input
          type="number"
          id="numberOfEvents"
          className="number-input"
          value={this.state.eventCountInput}
          onChange={this.handleNumber}
        /> */}
        <select
          name="cars"
          id="numberOfEvents"
          className="number-input"
          value={this.state.eventCountInput}
          onChange={this.handleNumber}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
    )
  }
}

export default NumberOfEvents;