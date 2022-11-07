import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';



describe('<Event /> component', () => {

  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event overview on default', () => {
    expect(EventWrapper.find('.event-overview')).toHaveLength(1);
  });

  test('render start time, summary in overview', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('render correct start time, summary in overview', () => {
    expect(EventWrapper.find('.start-time').text()).toBe(mockData[0].start.dateTime);
    expect(EventWrapper.find('.summary').text()).toBe(mockData[0].summary);
  });

  test('render details button on default', () => {
    expect(EventWrapper.find('.btn-details')).toHaveLength(1);
  });

  test('change state when button clicked', () => {
    EventWrapper.setState({
      isExpanded: false
    });
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.state('isExpanded')).toBe(true);
  });

  test('show detailed view instead of overview after clicking expand button', () => {
    EventWrapper.setState({
      isExpanded: true
    });
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
    expect(EventWrapper.find('.event-overview')).toHaveLength(0);
  });

  test('render summary, start-time, end-time, description, location in detailed view', () => {
    EventWrapper.setState({
      isExpanded: true
    });
    expect(EventWrapper.find('.summary')).toHaveLength(1);
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
    expect(EventWrapper.find('.end-time')).toHaveLength(1);
    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('.description')).toHaveLength(1);
  });

  test('render correct summary, start-time, end-time, description, location in detailed view', () => {
    EventWrapper.setState({
      isExpanded: true
    });
    expect(EventWrapper.find('.summary').text()).toBe(mockData[0].summary);
    expect(EventWrapper.find('.start-time').text()).toBe(mockData[0].start.dateTime);
    expect(EventWrapper.find('.end-time').text()).toBe(mockData[0].end.dateTime);
    expect(EventWrapper.find('.location').text()).toBe(mockData[0].location);
    expect(EventWrapper.find('.description').text()).toBe(mockData[0].description);
  });

  test('render collapse button in detailed view', () => {
    EventWrapper.setState({
      isExpanded: true
    });
    expect(EventWrapper.find('.btn-collapse')).toHaveLength(1);
  });

  test('change state when collapse button clicked', () => {
    EventWrapper.setState({
      isExpanded: true
    });
    EventWrapper.find('.btn-collapse').simulate('click');
    expect(EventWrapper.state('isExpanded')).toBe(false);
  });

});