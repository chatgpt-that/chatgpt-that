import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { SplashPage } from './src/pages/splash/splash';
import { GetIdTokenIFrame } from './src/pages/iframes/get-id-token';
import { LogoutIFrame } from './src/pages/iframes/logout';
import { LoginIFrame } from './src/pages/iframes/login';

const container = document.getElementById('root')!;
const root = createRoot(container);

const SplashLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='w-[1024px] h-full justify-self-center'>{children}</div>
  );
};

root.render(
  <Auth0Provider
    domain='dev-aqery6lj0pr7n2li.us.auth0.com'
    clientId='lzSdg1iTKgUgbyvoRh7ZUJmrYw4lVfyE'
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'https://dev-aqery6lj0pr7n2li.us.auth0.com/api/v2/',
      scope: 'openid email',
    }}
    useRefreshTokens={true}
    cacheLocation='localstorage'
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Navigate to='splash' replace />} />
          <Route path='splash' element={<SplashLayout><SplashPage /></SplashLayout>}/>
          <Route path='get-id-token-iframe' element={<GetIdTokenIFrame />} />
          <Route path='login-iframe' element={<LoginIFrame />}/>
          <Route path='logout-iframe' element={<LogoutIFrame />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
