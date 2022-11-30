import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import Paginator from './Paginator';
import { WarningAlert } from './Alert'
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: [],
    location: 'all',
    numberOfEvents: 20,
    page: 1,
    eventsTotalCount: null,
    warningText: ''
  }

  updateEvents = (location, eventCount, newPage) => {
    let eventCount_new = eventCount ? eventCount : this.state.numberOfEvents;
    let firstEvent = newPage ? ((newPage - 1) * eventCount_new) : 0;
    let lastEvent = newPage ? (newPage * eventCount_new) : eventCount_new;

    getEvents().then((events) => {

      if (newPage) {
        this.setState(
          { page: newPage }
        );
      } else if (location) {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) =>
            event.location === location);
        this.setState({
          events: locationEvents.slice(firstEvent, lastEvent),
          location: location,
          numberOfEvents: eventCount_new,
          eventsTotalCount: locationEvents.length,
          page: 1
        });
      } else if (eventCount) {
        const location = this.state.location;
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) =>
            event.location === location);
        this.setState({
          events: locationEvents.slice(firstEvent, lastEvent),
          numberOfEvents: eventCount_new,
          eventsTotalCount: locationEvents.length,
          page: 1
        });
      }
    });
  }

  checkOffline = () => {
    let warningText = !navigator.onLine ? 'Your device is offline. Displayed data may be outdated.' : '';
    this.setState({ warningText: warningText });
  }

  async componentDidMount() {
    this.mounted = true;
    this.checkOffline();
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), eventsTotalCount: events.length });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">
        <div className="header"><a href="/meet" title="Meet app" className="brand">Meetloaf</a></div>
        {this.state.warningText !== '' && <div className="alert-warning">
          <WarningAlert text={this.state.warningText} />
        </div>}
        <div className="flex-container">
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} page={this.state.page} />
        </div>
        <EventList events={this.state.events} />
        <Paginator page={this.state.page} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} eventsTotalCount={this.state.eventsTotalCount} />
      </div>
    );
  }
}

export default App;
