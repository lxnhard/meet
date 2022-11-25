Feature: Specify number of events

Scenario: When user hasn’t specified a number, 50 is the default number.
Given the user has not specified the number of events to be shown
When an event list is open 
Then the user should see a list of max. 50 upcoming events 

Scenario: User can change the number of events they want to see.
Given an event list is open
When the user specifies the number of X events to be shown
Then the user should see a list of max. X upcoming events 