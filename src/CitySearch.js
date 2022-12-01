import React, { Component } from 'react';
import { InfoAlert, ErrorAlert } from './Alert'

class CitySearch extends Component {

  constructor() {
    super();
    this.state = {
      // query: '',
      suggestions: [],
      showSuggestions: undefined,
      infoText: '',
      errorText: ''
    }
  }


  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    let valueRegex = /[^A-Za-z ,.]/;
    if (valueRegex.test(value)) {
      this.setState(
        {
          query: value,
          suggestions,
          infoText: '',
          errorText: 'Invalid input'
        }
      );
      this.props.handleQueryChange(value);
    } else if (suggestions.length === 0) {
      this.setState(
        {
          query: value,
          suggestions,
          infoText: 'We can\'t find the city you are looking for.',
          errorText: ''
        }
      );
      this.props.handleQueryChange(value);

    } else {
      this.setState(
        {
          query: value,
          suggestions,
          infoText: '',
          errorText: ''
        }
      );
      this.props.handleQueryChange(value);

    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: '',
      errorText: ''
    });
    this.props.handleQueryChange(suggestion);
    this.props.updateEvents(suggestion);
  }

  render() {

    let inputStyle = {};
    if (this.state.infoText !== '') {
      inputStyle = { borderColor: "blue" };
    } else if (this.state.errorText !== '') {
      inputStyle = { borderColor: "red" };
    }


    return (
      <>
        <div className="CitySearch">
          <div className="alerts">
            <InfoAlert text={this.state.infoText} />
            <ErrorAlert text={this.state.errorText} />
          </div>
          <input
            type="text"
            className="city"
            value={this.props.query}
            placeholder="Search for a city"
            onChange={this.handleInputChanged}
            onFocus={() => { this.setState({ showSuggestions: true }) }}
            style={inputStyle}
          />
          <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
            {this.state.suggestions.map((suggestion) => (
              <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
                {suggestion}
              </li>
            ))}
            <li key="all" onClick={() => this.handleItemClicked("all")} >
              <b>See all cities</b>
            </li>
          </ul>
        </div >
      </>
    );
  }
}

export default CitySearch;