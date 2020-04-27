import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as sessionUserApi from '../../api/session-user';

const initialState = {
  online: false,
  invalidLogin: false,
  activeUser: {},
  registrationFail: false
};

export const REGISTER = 'session-user: register';
const REGISTER_SUCCESS = 'session-user: register-success';
const REGISTER_FAILURE = 'session-user: register-failure';
const CLOSE_REGISTRATION_FAIL_WINDOW = 'session-user: close-registration-fail-window';
export const LOGIN = 'session-user: login';
const LOGIN_SUCCESS = 'session-user: login-success';
const LOGIN_FAILURE = 'session-user: login-failure';
const CLOSE_LOGIN_FAIL_WINDOW = 'session-user: close-login-fail-window';
export const LOGOUT = 'session-user: logout';

export const sessionUserReducer = handleActions({
  [REGISTER]: (state, { payload }) => ({
    ...state,
    registrationFail: false
  }),

  [REGISTER_FAILURE]: (state, { payload }) => 
  // console.log(payload),
  ({
    ...state,
    registrationFail: true
  }),

  [CLOSE_REGISTRATION_FAIL_WINDOW]: (state) => ({
    ...state,
    registrationFail: false
  }),
  
  [LOGIN]: (state, { payload }) => ({
    ...state,
    invalidLogin: false
  }),

  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    online: true,
    activeUser: payload,
    invalidLogin: false
  }),

  [LOGIN_FAILURE]: (state, { payload }) => ({
    ...state,
    invalidLogin: true
  }),

  [CLOSE_LOGIN_FAIL_WINDOW]: (state) => ({
    ...state,
    invalidLogin: false
  }),

  [LOGOUT]: (state) => ({
    ...state,
    online: false,
    activeUser: {}
  }),

}, initialState);

export const logIn = (encodedUser) => (dispatch, getState) => {
  dispatch({ type: LOGIN });
  
  sessionUserApi.logIn(encodedUser)
    .then((user) => dispatch(loginSuccess(user)))
    .then(() => dispatch(push('/home')))
    .catch(() => dispatch(loginFailure()))
};

export const register = (user) => (dispatch, getState) => {
  dispatch({ type: REGISTER });
  
  sessionUserApi.register(user)
    .then((response) => dispatch(registerSuccess(response)))
    .then(() => dispatch(push('/login')))
    .catch((error) => dispatch(registerFailure(error)))
};

export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
export const closeRegistrationFailWindow = createAction(CLOSE_REGISTRATION_FAIL_WINDOW);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const closeLoginFailWindow = createAction(CLOSE_LOGIN_FAIL_WINDOW);
export const logout = createAction(LOGOUT);


