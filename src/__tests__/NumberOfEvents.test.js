import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

  test('render number input', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
  });

  test('renders number input correctly', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
  });

  test('show default number of 32', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const numberOfEvents = 32;
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
  });

  test('change state when number input changes', () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const eventObject = { target: { value: 16 } };
    NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
  });

});