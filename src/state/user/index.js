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
export const ADD_FRIEND = 'user: add-friend';
const ADD_FRIEND_SUCCESS = 'user: add-friend-success';
const ADD_FRIEND_FAILURE = 'user: add-friend-failure';
export const GET_USER_FRIENDS = 'user: get-user-friends';
const GET_USER_FRIENDS_SUCCESS = 'user: get-user-friends-success';
const GET_USER_FRIENDS_FAILURE = 'user: get-user-firends-failure';
export const DELETE_FRIEND = 'user: delete-friend';
const DELETE_FRIEND_SUCCESS = 'user: delete-friend-success';
const DELETE_FRIEND_FAILURE = 'user: delete-friend-failure';


export const userReducer = handleActions({
  [FIND_FRIEND_SUCCESS]: (state, { payload }) => ({
    ...state,
    friend: payload
  }),

  [GET_USER_FRIENDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    friendsList: payload
  }),

  [DELETE_FRIEND_SUCCESS]: (state, { payload }) => ({
    ...state,
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

export const deleteFriend = (id, friend) => (dispatch, getState) => {
  dispatch({ type: DELETE_FRIEND });

  userApi.deleteFriend(id, friend) 
    .then((user) => dispatch(deleteFriendSuccess(user)))
    .then(() => dispatch(getUserFriends(id)))
    .catch(() => dispatch(deleteFriendFailure()));
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
export const deleteFriendSuccess = createAction(DELETE_FRIEND_SUCCESS);
export const deleteFriendFailure = createAction(DELETE_FRIEND_FAILURE);


