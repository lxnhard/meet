import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  })

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
  });

  test('renders number input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('eventCountInput');
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
  });

  test('show default number of 32', () => {
    const numberOfEvents = 32;
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
  });

  test('change state when number input changes', () => {
    const eventObject = { target: { value: 16 } };
    NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventCountInput')).toBe(16);
  });

});