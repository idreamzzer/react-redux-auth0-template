import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk), // add your middlewares here
      // Conditionally add the Redux DevTools extension enhancer if it is installed.
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

export default configureStore;
