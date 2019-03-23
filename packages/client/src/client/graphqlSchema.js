import gql from 'graphql-tag';

// Example Bike Stations Component to illustrate how Apollo client connects
// to the GraphQL backend. Feel free to alter this as you see fit.

export const GET_BIKE_STATIONS = gql`
  {
    bikeStations {
      stationId
      name
      bookmarked
    	location {
        lat
        lng
      }
      status {
        availableBikes
        emptyDocks
        capacity
      }
    }
  }
`;

export const updateBookmark = gql`
  mutation UpdateBookmark($stationId: ID!, $bookmarked: Boolean) {
    updateBookmark(stationId: $stationId, bookmarked: $bookmarked) {
      stationId
      name
      bookmarked
    	location {
        lat
        lng
      }
      status {
        availableBikes
        emptyDocks
        capacity
      }
    }
  }
`;
