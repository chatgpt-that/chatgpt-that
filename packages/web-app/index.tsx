import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { SplashPage } from './src/pages/splash/splash';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain='dev-aqery6lj0pr7n2li.us.auth0.com'
    clientId='lzSdg1iTKgUgbyvoRh7ZUJmrYw4lVfyE'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <div className='w-[1450px] justify-self-center'>
      <SplashPage />
    </div>
  </Auth0Provider>
);
