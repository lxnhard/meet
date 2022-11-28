import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import Paginator from './Paginator';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    page: 1
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
      }

      if (eventCount) {
        this.setState({
          page: 1
        });
      }

      if (location) {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) =>
            event.location === location);
        this.setState({
          events: locationEvents.slice(firstEvent, lastEvent),
          numberOfEvents: eventCount_new
        });
      } else {
        this.setState({
          events: events.slice(firstEvent, lastEvent),
          numberOfEvents: eventCount_new
        });
      }
    });
  }

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), eventsCount: events.length });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">
        <div className="flex-container">
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} page={this.state.page} />
        </div>
        <EventList events={this.state.events} />
        <Paginator page={this.state.page} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} eventsCount={this.state.eventsCount} />
      </div>
    );
  }
}

export default App;
