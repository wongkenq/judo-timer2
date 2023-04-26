import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Auth0Provider
          domain="dev-yi7wxr1jbz07puck.us.auth0.com"
          clientId="OnIrVgNxL6u2g3l3Q0fCvActkH41zCUq"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
