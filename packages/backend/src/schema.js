const { gql } = require('apollo-server');
const { getBikeStations, updateBikeStation } = require('./bikeStation/bikeStationHelper');

const typeDefs = gql`
  # This is the example "BikeStation" type. Extend it as you see fit.
  """
  Represents a Bike Station.
  """
  type BikeStation {
    stationId: ID!
    name: String!
    bookmarked: Boolean
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

  # Mutation to update bookmark status
  type Mutation {
    updateBookmark(stationId: ID!, bookmarked: Boolean): BikeStation
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    bikeStations: async () => getBikeStations(),
  },
  Mutation: {
    updateBookmark: async (parent, args) => updateBikeStation(args.stationId, args.bookmarked)
  }
};

module.exports = { typeDefs, resolvers };
