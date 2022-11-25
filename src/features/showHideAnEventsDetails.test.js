import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user hasn’t clicked any event’s details button', () => {

    });

    let AppWrapper;
    when('the app is open', async () => {
      AppWrapper = await mount(<App />);
    });

    then('the user should see a list of all upcoming events with condensed details', () => {
      expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {

    let AppWrapper;
    given('the app is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks the expand button for a specific event', async () => {
      AppWrapper.update();
      await AppWrapper.find('.btn-details').at(0).simulate('click');
    });

    then('the user should see an expanded view with more details about the event', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {

    let AppWrapper;
    given('the app is open', () => {
      AppWrapper = mount(<App />);
    });

    and('the view of an event is expanded', async () => {
      AppWrapper.update();
      await AppWrapper.find('.btn-details').at(0).simulate('click');
    });

    when('the user clicks the collapse button for a specific event', async () => {
      AppWrapper.update();
      await AppWrapper.find('.btn-collapse').at(0).simulate('click');
    });

    then('the user should see an condensed view with less details about the event (default view)', () => {
      expect(AppWrapper.find('.event').at(0).find('.event-details')).toHaveLength(0);
    });
  });

});