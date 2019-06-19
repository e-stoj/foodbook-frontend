import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as sessionUserApi from '../../api/session-user';

const initialState = {
  online: false,
  invalidLogin: false,
  activeUser: {},
  registrationPage: true
};

export const REGISTER = 'session-user: register';
const REGISTER_SUCCESS = 'session-user: register-success';
const REGISTER_FAILURE = 'session-user: register-failure';
export const LOGIN = 'session-user: login';
const LOGIN_SUCCESS = 'session-user: login-success';
const LOGIN_FAILURE = 'session-user: login-failure';
export const LOGOUT = 'session-user: logout';
export const GO_TO_REGISTRATION_PAGE = 'session-user: go-to-registration-page';

export const sessionUserReducer = handleActions({
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

  [LOGOUT]: (state) => ({
    ...state,
    online: false,
    activeUser: {}
  }),

  [GO_TO_REGISTRATION_PAGE]: (state, { payload }) => ({
    ...state,
    registrationPage: !state.registrationPage
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
    .then(() => dispatch(registerSuccess()))
    .then(() => dispatch(push('/login')))
    .catch(() => dispatch(registerFailure()))
};

export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const goToRegistrationPage = createAction(GO_TO_REGISTRATION_PAGE);


