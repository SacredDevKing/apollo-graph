import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Init apollo client
const client = new ApolloClient({
  uri: 'http://localhost:6001',
  cache: new InMemoryCache(), //cache query results after fetching them.
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
