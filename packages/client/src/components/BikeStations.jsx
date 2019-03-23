import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Example Bike Stations Component to illustrate how Apollo client connects
// to the GraphQL backend. Feel free to alter this as you see fit.

const GET_BIKE_STATIONS = gql`
  {
    bikeStations {
      stationId
      name
    }
  }
`;

export const BikeStations = () => (
  <Query query={GET_BIKE_STATIONS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        console.log('Bike Stations:', data.bikeStations) || (
          <div>Stations Loaded</div>
        )
      );
    }}
  </Query>
);
