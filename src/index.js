import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistore } from './store';

import App from './App';
import './styles/global.scss';
import './styles/swiper.scss';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <App />
    </PersistGate>
  </Provider>
);
