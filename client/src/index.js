import './config/firebase.config'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import StoreProvider from './store/storeContentex';
import App from './App';



const client = new ApolloClient({
  uri: "http://localhost:8000/api/v1/",
  cache: new InMemoryCache()
})


ReactDOM.createRoot(document.getElementById('root'))
.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <StoreProvider>

        <App />
      </StoreProvider>
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
