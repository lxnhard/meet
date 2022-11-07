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
      <div className="NumberOfEvents">
        <input
          type="number"
          className="number-input"
          value={this.state.numberOfEvents}
          onChange={this.handleNumber}
        />
      </div>
    )
  }
}

export default NumberOfEvents;