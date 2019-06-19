import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as userApi from '../../api/user';

const initialState = {
  friend: {},
  friendsList: []
};

export const FIND_FRIEND = 'user: find-friend';
const FIND_FRIEND_SUCCESS = 'user: find-friend-success';
const FIND_FRIEND_FAILURE = 'user: find-friend-failure';
export const ADD_FRIEND = 'user: add-user';
const ADD_FRIEND_SUCCESS = 'user: add-user-success';
const ADD_FRIEND_FAILURE = 'user: add-user-failure';
export const GET_USER_FRIENDS = 'user: get-user-friends';
const GET_USER_FRIENDS_SUCCESS = 'user: get-user-friends-success';
const GET_USER_FRIENDS_FAILURE = 'user: get-user-firends-failure';

export const userReducer = handleActions({
  [FIND_FRIEND_SUCCESS]: (state, { payload }) => ({
    ...state,
    friend: payload
  }),

  [GET_USER_FRIENDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    friendsList: payload
  })

}, initialState);

export const findFriend = (login) => (dispatch, getState) => {
  dispatch({ type: FIND_FRIEND });

  userApi.findFriend(login)
    .then((user) => dispatch(findFriendSuccess(user)))
    .catch(() => dispatch(findFriendFailure()));
}

export const addFriend = (id, friend) => (dispatch, getState) => {
  dispatch({ type: ADD_FRIEND });

  userApi.addFriend(id, friend) 
    .then(() => dispatch(addFriendSuccess()))
    .catch(() => dispatch(addFriendFailure()));
}

export const getUserFriends = (id) => (dispatch, getState) => {
  dispatch({ type: GET_USER_FRIENDS });

  userApi.getUserFriends(id) 
    .then((friendsList) => dispatch(getUserFriendsSuccess(friendsList)))
    .catch(() => dispatch(getUserFriendsFailure())); 
}

export const findFriendSuccess = createAction(FIND_FRIEND_SUCCESS);
export const findFriendFailure = createAction(FIND_FRIEND_FAILURE);
export const addFriendSuccess = createAction(ADD_FRIEND_SUCCESS);
export const addFriendFailure = createAction(ADD_FRIEND_FAILURE);
export const getUserFriendsSuccess = createAction(GET_USER_FRIENDS_SUCCESS);
export const getUserFriendsFailure = createAction(GET_USER_FRIENDS_FAILURE);


