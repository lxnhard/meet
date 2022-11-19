import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    eventCountInput: 32
  }


  handleNumber = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ eventCountInput: value });
  }


  render() {

    return (
      <div className="numberOfEvents">
        <label htmlFor="numberOfEvents" className="number-label">Number of events:</label>
        <input
          type="number"
          id="numberOfEvents"
          className="number-input"
          value={this.state.eventCountInput}
          onChange={this.handleNumber}
        />
      </div>
    )
  }
}

export default NumberOfEvents;