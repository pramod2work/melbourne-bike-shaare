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
