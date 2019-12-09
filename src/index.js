import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { 
  routerMiddleware, 
  ConnectedRouter 
} from 'connected-react-router';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './state';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const reduxMiddlewares = [
  thunk,
  routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(createRootReducer(history), composeEnhancers(
  applyMiddleware(...reduxMiddlewares)
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router history={history}>
        <App />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
serviceWorker.register();
