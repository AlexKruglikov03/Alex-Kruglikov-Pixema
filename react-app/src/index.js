import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '../src/constants/_fonts.scss' //font-family and font-size//
import '../src/constants/_colors.scss' //colors in project//
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
