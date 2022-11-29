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

    function convertDateTime(DateTimeRaw) {
      const userLocale =
        navigator.languages && navigator.languages.length
          ? navigator.languages[0]
          : navigator.language;
      console.log(userLocale);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(userTimeZone);
      let DateTimeConv = new Date(DateTimeRaw).toLocaleString(userLocale, {
        timeZone: userTimeZone,
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      return DateTimeConv;
    }

    return (
      <div className="event">

        {/* Render overview */}
        {!isExpanded && (
          <div className='event-overview'>
            <div className='summary'>{event.summary}</div>
            <div className='start-time'>{convertDateTime(event.start.dateTime)}</div>
            <div className='location'>{event.location}</div>
            <button className='btn-arrow btn-details' onClick={this.toggleExpand}></button>
          </div >
        )}

        {/* Render detailed view */}
        {isExpanded && (
          <div className='event-details'>
            <div className='summary'>{event.summary}</div>
            <div><span className='time-label'>Start: </span><span className='start-time'>{convertDateTime(event.start.dateTime)}</span></div>
            <div><span className='time-label'>End: </span><span className='end-time'>{convertDateTime(event.end.dateTime)}</span></div>
            <div className='location'>{event.location}</div>
            <div className='description'>{event.description}</div>
            <button className='btn-arrow btn-collapse' onClick={this.toggleExpand}></button>
          </div >
        )}

      </div>
    );
  }
}

export default Event;