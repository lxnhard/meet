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

  test('show default number of 50', () => {
    const numberOfEvents = 50;
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(numberOfEvents);
  });


});