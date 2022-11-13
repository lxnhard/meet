import React, { Component } from 'react';

class Event extends Component {

  constructor() {
    super();
    this.state = {
      isExpanded: false
    }
  }

  toggleExpand = () => {
    this.state.isExpanded ? this.setState({ isExpanded: false }) : this.setState({ isExpanded: true });
  }

  render() {
    const { event } = this.props;
    let { isExpanded } = this.state;

    return (
      <div className="event">

        {/* Render overview */}
        {!isExpanded && (
          <div className='event-overview'>
            <div className='summary'>{event.summary}</div>
            {/* <div className='start-time'>{new Date(event.start.dateTime).toLocaleString('en-GB').slice(0, -3)}</div> */}
            <div className='start-time'>{event.start.dateTime}</div>
            <div className='location'>{event.location}</div>
            <button className='btn-details' onClick={this.toggleExpand}>Show Details</button>
          </div >
        )}

        {/* Render detailed view */}
        {isExpanded && (
          <div className='event-details'>
            <div className='summary'>{event.summary}</div>
            <div className='start-time'>{event.start.dateTime}</div>
            <div className='end-time'>{event.end.dateTime}</div>
            <div className='location'>{event.location}</div>
            <div className='description'>{event.description}</div>
            <button className='btn-collapse' onClick={this.toggleExpand}>Hide Details</button>
          </div >
        )}

      </div>
    );
  }
}

export default Event;