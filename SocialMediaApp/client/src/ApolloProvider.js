import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import App from './App';

// Init apollo client
const client = new ApolloClient({
  uri: 'http://localhost:6001',
  cache: new InMemoryCache(), //cache query results after fetching them.
});

export default (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='home' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);
