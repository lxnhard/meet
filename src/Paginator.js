import React, { Component } from 'react';

class Paginator extends Component {


  handlePageUp = () => {
    let newPage = this.props.page + 1;
    this.props.updateEvents(null, null, newPage);
  }

  handlePageDown = () => {
    let newPage = this.props.page - 1;
    this.props.updateEvents(null, null, newPage);
  }


  render() {
    const { eventsCount, numberOfEvents } = this.props;

    const maxPages = Math.ceil(eventsCount / numberOfEvents);

    return (
      <div className="paginator">
        <span>
          {this.props.page > 1 &&
            <button onClick={this.handlePageDown} className="button-left">&lt;</button>}
        </span>
        <span>Page {this.props.page}/{maxPages}</span>
        <span>
          {this.props.page < maxPages &&
            <button onClick={this.handlePageUp} className="button-right">&gt;</button>}
        </span>
      </div>
    )
  }
}

export default Paginator;