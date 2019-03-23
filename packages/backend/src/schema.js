const { gql } = require('apollo-server');
const { getBikeStations } = require('./bikeStation/bikeStationHelper');

const typeDefs = gql`
  # This is the example "BikeStation" type. Extend it as you see fit.
  """
  Represents a Bike Station.
  """
  type BikeStation {
    stationId: ID!
    name: String!
    location: Location
    status: Station
  }

  # Represents Location based on lat and lng
  type Location {
    lat: Float!
    lng: Float!
  }

  # Represents stations Bikes and Docks status
  type Station {
    availableBikes: Int
    emptyDocks: Int
    capacity: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    """
    Retrieves the list of all bike stations.
    """
    bikeStations: [BikeStation]
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    bikeStations: async () => getBikeStations(),
  },
};

module.exports = { typeDefs, resolvers };
