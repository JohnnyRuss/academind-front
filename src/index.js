import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistore } from './store';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/global.scss';
import './styles/swiper.scss';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
