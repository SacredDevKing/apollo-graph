import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayUsers from './DisplayUsers';
import DisplayMovies from './DisplayMovies';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });

  // Let's fetch some data

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <DisplayMovies />
        <DisplayUsers />
      </div>
    </ApolloProvider>
  );
}

export default App;
