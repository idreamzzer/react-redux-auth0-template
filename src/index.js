import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';
import App from './containers/App';
import './global.css';

// dotenv.config();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();