import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { sessionUserReducer } from './session-user/index';
import { userReducer } from './user/index';
import { localsReducer } from './locals/index';
import { eventReducer } from './event/index';

export default (history) => combineReducers({
  router: connectRouter(history),
  sessionUser: sessionUserReducer,
  user: userReducer,
  locals: localsReducer,
  event: eventReducer
})
