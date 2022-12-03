import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import Paginator from './Paginator';
import ChartCity from './ChartCity';
import { WarningAlert } from './Alert'
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import ChartEventGenre from './ChartEventGenre';

class App extends Component {

  state = {
    events: [],
    locations: [],
    location: 'all',
    numberOfEvents: 20,
    page: 1,
    eventsTotalCount: null,
    warningText: '',
    data: [],
    query: '',
    showChart: 'bar'
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
    let warningText = navigator.onLine ? '' : 'Your device is offline. Displayed data may be outdated.';
    this.setState({ warningText });
  }

  getData = (locations, events) => {
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ')[0].split(' - ')[0];
      return { city, number };
    })
    return data;
  };

  handleQueryChange = (query) => {
    this.setState({ query });
  }

  swapChart = () => {
    this.setState(
      { showChart: (this.state.showChart === 'bar' ? 'pie' : 'bar') }
    );
    console.log(this.state.showChart)
  }

  async componentDidMount() {
    this.mounted = true;
    this.checkOffline();
    getEvents().then((events) => {
      if (this.mounted) {
        const locations = extractLocations(events);
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: locations, eventsTotalCount: events.length, data: this.getData(locations, events) });

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
          <CitySearch locations={this.state.locations} location={this.state.location} updateEvents={this.updateEvents} query={this.state.query} handleQueryChange={this.handleQueryChange} />
          <NumberOfEvents updateEvents={this.updateEvents} page={this.state.page} />
        </div>
        <div className="btn-chart-container"><button className='btn-chart' onClick={this.swapChart}
          style={this.state.showChart === 'bar' ?
            {
              backgroundImage: "url(/meet/icon-pie_chart.svg)",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: '80%'
            } :
            {
              backgroundImage: "url(/meet/icon-bar_chart.svg)",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: '80%'
            }}
          title={this.state.showChart === 'bar' ? "Show event genre distribution" : "Show event city distribution"}
        ></button></div>
        {this.state.showChart === 'bar' && this.state.data.length > 0 && <ChartCity data={this.state.data} updateEvents={this.updateEvents} locations={this.state.locations} handleQueryChange={this.handleQueryChange} />}
        {this.state.showChart === 'pie' && <ChartEventGenre events={this.state.events} />}
        <EventList events={this.state.events} />
        <Paginator page={this.state.page} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} eventsTotalCount={this.state.eventsTotalCount} />
      </div>
    );
  }
}

export default App;
