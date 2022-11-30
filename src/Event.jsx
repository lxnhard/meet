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
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let DateTimeConv = new Date(DateTimeRaw).toLocaleString(userLocale, {
        timeZone: userTimeZone,
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      return DateTimeConv;
    }

    function calcDuration(start, end) {
      start = new Date(start);
      end = new Date(end);
      let timeDiff = end.getTime() - start.getTime();
      let duration = msToHM(timeDiff);
      return duration;
    }

    function msToHM(ms) {
      let seconds = ms / 1000;
      const hours = ('0' + parseInt(seconds / 3600)).slice(-2);
      seconds = seconds % 3600;
      const minutes = ('0' + parseInt(seconds / 60)).slice(-2);
      return (hours + ":" + minutes + " h");
    }

    return (
      <div className="event">

        {/* Render overview */}
        {!isExpanded && (
          <div className='event-overview'>
            <div className='summary'>{event.summary}</div>
            <div className="datetime-container"><div className="icon icon-calendar"></div><span className='start-time'>{convertDateTime(event.start.dateTime)}</span></div>
            <div className="location-container"><div className="icon icon-location"></div><span className='location'>{event.location}</span>
            </div>
            <button className='btn-arrow btn-details' onClick={this.toggleExpand}></button>
          </div >
        )}

        {/* Render detailed view */}
        {isExpanded && (
          <div className='event-details'>
            <div className='summary'>{event.summary}</div>
            <div className="datetime-container"><div className="icon icon-calendar"></div><span className='start-time'>{convertDateTime(event.start.dateTime)}</span></div>
            <div className="datetime-container"><div className="icon icon-clock"></div><span className='duration'>{calcDuration(event.start.dateTime, event.end.dateTime)}</span></div>
            <div className="location-container"><div className="icon icon-location"></div><span className='location'>{event.location}</span></div>
            <div className='description'>{event.description}</div>
            <button className='btn-arrow btn-collapse' onClick={this.toggleExpand}></button>
          </div >
        )}

      </div>
    );
  }
}

export default Event;