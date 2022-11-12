# MEET app
An app that shows upcoming events in different cities. 
MEET is a serverless, progressive web application (PWA) built with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## Table of contents

- [Overview](#overview)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### Features

#### FEATURE 1: FILTER EVENTS BY CITY
**User Story:**  
As a user  
I should be able to “filter events by city”  
So that I can see the list of events that take place in that city 

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
- Given user hasn’t searched for any city
- When the user opens the app
- Then the user should see a list of all upcoming events

SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
- Given the main page is open
- When user starts typing in the city textbox
- Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
- Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
- When the user selects a city (e.g., “Berlin, Germany”) from the list
- Then their city should be changed to that city (i.e., “Berlin, Germany”) 
And the list of suggestions should disappear
And the user should receive a list of upcoming events in that city

#### FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
**User Story:**  
As a user  
I should be able to „show and hide event details“  
So that I can see more or less details about the event

SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT.
- Given user hasn’t clicked any event
- When the user opens an event list 
- Then the user should see a list of all upcoming events with condensed details

SCENARIO 2: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS.
- Given an event list is open
- When the user clicks the expand button for a specific event
- Then the user should see an expanded view with more details about the event

SCENARIO 3: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS.
- Given the view of an event is expanded
- When the user clicks the collapse button for a specific event
- Then the user should see an condensed view with less details about the event (default view)

#### FEATURE 3: SPECIFY NUMBER OF EVENTS
**User Story:**  
As a user  
I should be able to „specify the number of events“  
So that I can decide how many events I want to see listed

SCENARIO 1: WHEN USER HASN’T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER.
- Given the user has not specified the number of events to be shown
- When an event list is open 
- Then the user should see a list of 32 upcoming events 

SCENARIO 2: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE.
- Given an event list is open
- When the user specifies the number of X events to be shown
- Then the user should see a list of X upcoming events 

#### FEATURE 4: USE THE APP WHEN OFFLINE
**User Story:**  
As a user  
I should be able to „use the app when offline“  
So that I can see the cached events when I don’t have an internet connection 

SCENARIO 1: SHOW CACHED DATA WHEN THERE’S NO INTERNET CONNECTION.
- Given the user is offline
- When the event list is open
- Then the user should see a list of cached events for the city selected when online last

SCENARIO 2: SHOW ERROR WHEN USER CHANGES THE SETTINGS (CITY, TIME RANGE).
- Given the user is offline
- When the user changes the city
- Then the user should see an error message

#### FEATURE 5: DATA VISUALIZATION
**User Story:**  
As a user  
I should be able to „see a chart with the number of upcoming events in each city“  
So that I can easily and instantly grasp the number of upcoming events

SCENARIO 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN ALL CITIES.
- Given the user hasn’t specified a city
- When the user opens the data visualization component
- Then the user should see a chart of events in all cities

SCENARIO 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN A SPECIFIC CITY.
- Given the user has specified a city
- When the user opens the data visualization component
- Then the user should see a chart of events in this cities 

### Links

- Deployed app: [https://lxnhard.github.io/meet/](https://lxnhard.github.io/meet/)

## My process

### Built with

- React

### What I learned

- tbd