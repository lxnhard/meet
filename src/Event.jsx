import React, { Component } from 'react';

class Event extends Component {

  constructor() {
    super();
    this.state = {
      isExpanded: false
    }
  }

  handleExpand = () => {
    this.setState({ isExpanded: true });
  }

  handleCollapse = () => {
    this.setState({ isExpanded: false });
  }

  render() {
    const { event } = this.props;
    let { isExpanded } = this.state;

    return (
      <>
        {/* Render overview */}
        {!isExpanded && (
          <div className='event-overview'>
            <div className='start-time'>{event.start.dateTime}</div>
            <div className='summary'>{event.summary}</div>
            <button className='btn-details' onClick={this.handleExpand}>Details</button>
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
            <button className='btn-collapse' onClick={this.handleCollapse} >Collapse</button>
          </div >
        )}

      </>
    );
  }
}

export default Event;