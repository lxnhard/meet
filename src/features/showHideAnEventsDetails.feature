Feature: Show/hide an event’s details

Scenario: An event element is collapsed by default
Given user hasn’t clicked any event’s details button
When the app is open
Then the user should see a list of all upcoming events with condensed details

Scenario: User can expand an event to see its details
Given the app is open
When the user clicks the expand button for a specific event
Then the user should see an expanded view with more details about the event

Scenario: User can collapse an event to hide its details
Given the app is open
And the view of an event is expanded
When the user clicks the collapse button for a specific event
Then the user should see an condensed view with less details about the event (default view)