import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
