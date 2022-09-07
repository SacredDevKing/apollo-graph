// Resolve logic for any query, mutations or subscriptions
const resolvers = {
  Query: {
    greeting: () => 'Hello from planet Earth',
  },
};

module.exports = resolvers;
