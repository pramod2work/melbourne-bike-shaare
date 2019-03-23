# Full-stack Javascript Developer Exercise

## Background

The Domain Group is looking for amazing, talented full-stack Javascript engineers to join the Homepass Team to build
the future of real estate. We’re assembling an elite mobile-centric team who want to excel at applying cutting-edge
technology and to deliver products that delight our users.

## Task: Melbourne Bike-share Bookmarking Web App

We would like you to use this skeleton implementation to complete a simple Melbourne Bike Share web-app that works
well on mobile.

Melbourne Bike Share stations are essentially council owned bike-share stations where members of the public can freely
hire to ride around Melbourne. Each station is a parking bay of shared bikes, where users can freely rent a bike for use,
with a condition that they return the bike to a station once they have completed.

As such, each bike-share station is represented as follows

- station id
- station name
- location (lat, lng)
- realtime station status
  - available bikes
  - empty docks
  - capacity
  - last updated

You challenge is to build a web-app that visualises the data on a map and provide the ability to bookmark certain stations
to make it convenient to quickly navigate to each bookmarked station for later.

## Requirements

### 1. Clientside

- it is highly preferrable that it works on the browser on mobile. We're a mobile first company.
- if you can't make it work on a mobile, then desktop is fine but we will penalise your submission.

### 2. Backend

- You must use a GraphQL backend. We're looking for full-stack developers so you must show us your backend and frontend
  skills.
- A skeleton implementation has been provided to get you going and save you some time. This implementation uses the stock
  standard Apollo Server implementation. If you are unfamiliar, please consult https://www.apollographql.com/docs/apollo-server/

### 3. Visualisation

- You must display all stations on a google map
- Each station is to be depicted as a circle
- The size of the circle should be proportional to either the number of available bikes, or the number of empty docks, depending
  on which is the active filter.
- Each circle should have at least a minimum size to denote the station (i.e. if you are showing available bikes, and the
  value is 0, it should still be visible on the map)

### 4. Interaction

- A user may tap on a station. When they do so, your app should:
  - Center the map on the station
  - Show a popup indicating the details of the station
  - Render a bookmark toggle button (with a star icon). This should toggle whether a bike station is bookmarked.
  - Any other details you think might be of interest / use.

### 5. Filtering Stations

- A toggle should be present that allows the users to show stations by
  - Available Bikes
  - Empty Docks

### 6. Autocomplete Search For Navigation - Bonus Points Optional

- On top of the map, you should provide an autocomplete text box.
- As a user types in to that autocomplete box, you should render a list of bike stations that match the text provided.
- Matching is defined as a case-insenstive match of the stations name. So long as the name includes characters that match
  the input string, it should show.
- When a user taps on the listed matched bike station, the app will center the map on the bike station
- You can choose to implement this either entirely clientside, or you could use the graph (using field parameters on the bikeStations
  field)

### 7. Navigation

- You should be able to easily navigate from station to station by clicking on each station on the map, remembering this
  is a mobile app.

### 8. Bookmarking

- You should be able indicate to bookmark a station or to unbookmark it (if it has already been bookmarked)
- You should store the state in the backend. This requires that you write a GraphQL mutation.
- For the sake of this exercise, you can assume:
  - that there is only ever one user on the app. If you are able to handle multiple sessions, bonus points.
  - the server will always be up. The bookmarked state can reset between server restarts (i.e. no need to use a database).

### 9. Testing

- You should choose one front-end and one backend area of the app to unit test in completeness. Do it to a standard of
  what you would consider done.

### 10. Documentation

- Please include a COMMENTS.md file which outlines what key things you want to help draw our attention to that highlights
  your skills.
- Under a section titled "Improvements", outline what you might have done more, or improved if you had time

### 11. Time

- Please spend a minimum of 1.5 hrs to complete this.
- There is no upper bound constraint on how much time you can spend doing this. You should however submit this as soon as you
  can.

## Grading Criteria

You will be assessed on the following qualities:

1. Functionality

- Does the app function as spec'ed above
- What functional 'polish' was added to make it work better, bring joy/delight etc
- How did the candidate consider mobile constraints

2. Quality

- Did the candidate present at least one high quality unit test on the clientside
- Did the candidate present at least one high quality unit test on the serverside
- Did the candidate present code of high "hygene"

3. Bonus Points

- Was there additional engineering "best" practices / libraries / assets which the candidate used
- The presented submission showed good product thinking

We will mark your solution and present it back to you as minimum feedback. If you spend the time coding something, we will at
least provide useful feedback to help you improve.

## Skeleton Project

Workspaces are a new way to setup your package architecture that’s available by default starting from Yarn 1.0. It allows you to setup multiple packages in such a way that you only need to run yarn install once to install all of them in a single pass.

In this example we have 2 workspaces:

- **packages/backend**
  - project.json - backend package definition
  - src
    - bikeStation
      - data - folder contains CSV files sourced from
        - https://data.melbourne.vic.gov.au/Transport-Movement/Melbourne-Bike-Share-stations-with-current-number-/tdvh-n9dv
        - https://data.melbourne.vic.gov.au/Transport-Movement/Bike-Share-Dock-Locations/vrwc-rwgm
      - bikeStationHelper.js - module containing helper methods for bike stations
    - csv
      - csvHelper.js - module containing helper methods for handling CSV files
    - app.js - serverside app
    - schema.js - the GraphQL schema definition
- **packages/client** - generated by create-react-app
  - project.json - client package definition
  - src
    - client
      - client.js - example Apollo client initialisation. Hooked to http://localhost:4000
    - components
      - BikeStations.jsx - example BikeStations component with GraphQL query
    - App.css - generated by create-react-app
    - App.js - generated by create-react-app
    - App.test.js - generated by create-react-app
    - index.css - generated by create-react-app
    - index.js - generated by create-react-app
    - logo.svg - generated by create-react-app
    - serviceWorker.js - generated by create-react-app
  - public - static assets folder
  - README.md - generated by create-react-app

Feel free to alter, change or use a completely different setup that you see fit to meet the above requirements. The backend and client
projects was assembled to help save you time. It contains a backend and react clientside configured to talk to the backend GraphQL. It
also includes the [`google-maps-react`](https://github.com/fullstackreact/google-maps-react) component wired up and ready to go. You will
need to supply your own Google Maps API Key. To get your own key follow this
[link](https://developers.google.com/maps/documentation/embed/get-api-key). Use this as your starting point for implementing the
above exercise.

The example app simply prints the retrieved set of bike stations from the GraphQL backend. You will need to setup tests, leverage the
`google-maps-react` component to render the bike stations, and implement the required interactions to complete the exercise.

## Install it and run:

```bash
yarn
yarn dev
```

## Submission

Please zip (without `node_modules`) your submission, host it on Google Drive, Dropbox etc and send it to the email address
indicated when the test was assigned to you. Make sure you include your `.git` directory, we would like to see your commits
if possible.
