import React, { Component } from 'react';




class NumberOfEvents extends Component {

  constructor() {
    super();
    this.state = {
      numberOfEvents: 32
    }
  }

  handleNumber = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
  }

  render() {

    return (
      <div className="numberOfEvents">
        <label for="numberOfEvents" className="number-label">Number of events:</label>
        <input
          type="number"
          id="numberOfEvents"
          className="number-input"
          value={this.state.numberOfEvents}
          onChange={this.handleNumber}
        />
      </div>
    )
  }
}

export default NumberOfEvents;