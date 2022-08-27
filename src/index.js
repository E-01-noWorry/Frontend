import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/config/store';
import { Provider } from 'react-redux';
import GlobalStyles from './shared/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
);
