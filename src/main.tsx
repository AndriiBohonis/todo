import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import App from '@/app.tsx';
import store from '@/core/store';
import { createRoot } from 'react-dom/client';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
