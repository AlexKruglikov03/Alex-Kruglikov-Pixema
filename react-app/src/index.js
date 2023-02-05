import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { store } from "./store/store.ts"
import Home from 'pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <div className='container'>
        <App />
      </div>
  </Provider>
);



