import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');


defineFeature(feature, test => {
  test('When user hasn’t specified a number, 50 is the default number.', ({ given, when, then }) => {

    given('the user has not specified the number of events to be shown', () => {

    });

    let AppWrapper;
    when('an event list is open', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a list of max. 50 upcoming events', () => {
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(50);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {

    let AppWrapper;
    given('an event list is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user specifies the number of X events to be shown', async () => {
      const eventObject = { target: { value: 1 } };
      await AppWrapper.find('.number-input').simulate('change', eventObject);
    });

    then('the user should see a list of max. X upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(1);
    });
  });

});