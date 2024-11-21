import React from 'react';
import { createRoot } from 'react-dom/client';
import { SplashPage } from './src/pages/splash/splash';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <div className='w-[1450px] justify-self-center'>
    <SplashPage />
  </div>
);
