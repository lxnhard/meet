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
    const { eventsTotalCount, numberOfEvents } = this.props;
    const maxPages = eventsTotalCount ? Math.ceil(eventsTotalCount / numberOfEvents) : 0;

    return (
      <div className="paginator">
        <span>
          {this.props.page > 1 &&
            <button onClick={this.handlePageDown} className="btn-arrow btn-left"></button>}
        </span>
        {maxPages > 1 &&
          <span>Page {this.props.page}/{maxPages}</span>}
        <span>
          {this.props.page < maxPages &&
            <button onClick={this.handlePageUp} className="btn-arrow btn-right"></button>}
        </span>
      </div>
    )
  }
}

export default Paginator;