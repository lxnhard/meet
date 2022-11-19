import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  updateEvents = (location, eventCount) => {
    let eventCount_new = eventCount ? eventCount : this.state.numberOfEvents;
    getEvents().then((events) => {
      if (location) {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) =>
            event.location === location);
        this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount_new
        });
      } else {
        this.setState({
          events: events.slice(0, eventCount),
          numberOfEvents: eventCount_new
        });
      }
    });
  }

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
