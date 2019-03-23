const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const  gql =  require('graphql-tag');

const { typeDefs, resolvers } = require('../schema');

const GET_BIKE_STATIONS = gql`
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

const updateBookmark = gql`
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

it('Check for query schema', async () => {
  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  // use the test server to create a query function
  const { query } = createTestClient(server);

  // run query against the server and snapshot the output
  const res = await query({ query: GET_BIKE_STATIONS });
  expect(res).toMatchSnapshot();
});

it('Check for mutation', async () => {
  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  // use the test server to create a query function
  const { mutate } = createTestClient(server);

  // run query against the server and snapshot the output
  const res = await mutate({ mutation: updateBookmark, variables: { stationId: "52", bookmarked: true }});
  expect(res).toMatchSnapshot();
});