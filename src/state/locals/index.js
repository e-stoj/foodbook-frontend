import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as localsApi from '../../api/locals';

const initialState = {
  localsList: [],
  motivesList: [],
  deleteFail: false
};

export const GET_ALL_LOCALS = 'locals: get-all-locals';
const GET_ALL_LOCALS_SUCCESS = 'locals: get-all-locals-success';
const GET_ALL_LOCALS_FAILURE = 'locals: get-all-locals-failure';
export const GET_ALL_MOTIVES = 'locals: get-all-motives';
const GET_ALL_MOTIVES_SUCCESS = 'locals: get-all-motives-success';
const GET_ALL_MOTIVES_FAILURE = 'locals: get-all-motives-failure';
export const ADD_NEW_LOCAL = 'locals: add-new-local';
const ADD_NEW_LOCAL_SUCCESS = 'locals: add-new-local-success';
const ADD_NEW_LOCAL_FAILURE = 'locals: add-new-local-failure';
export const UPDATE_LOCAL = 'locals: update-local';
const UPDATE_LOCAL_SUCCESS = 'locals: update-local-success';
const UPDATE_LOCAL_FAILURE = 'locals: update-local-failure';
export const DELETE_LOCAL = 'locals: delete-local';
const DELETE_LOCAL_SUCCESS = 'locals: delete-local-success';
const DELETE_LOCAL_FAILURE = 'locals: delete-local-failure';
export const GET_LOCALS_WITH_SELECTED_MOTIVE = 'locals: get-locals-with-selected-motive';
const GET_LOCALS_WITH_SELECTED_MOTIVE_SUCCESS = 'locals: get-locals-with-selected-motive-success';
const GET_LOCALS_WITH_SELECTED_MOTIVE_FAILURE = 'locals: get-locals-with-selected-motive-failure';
export const CLOSE_DELETE_FAIL_WINDOW = 'locals: close-delete-fail-window';

export const localsReducer = handleActions({
  [GET_ALL_LOCALS_SUCCESS]: (state, { payload }) => ({
    ...state,
    localsList: payload
  }),

  [GET_ALL_MOTIVES_SUCCESS]: (state, { payload }) => ({
    ...state,
    motivesList: payload
  }),

  [GET_LOCALS_WITH_SELECTED_MOTIVE_SUCCESS]: (state, { payload }) => ({
    ...state,
    localsList: payload
  }),

  [DELETE_LOCAL_FAILURE]: (state) => ({
    ...state,
    deleteFail: true
  }),

  [CLOSE_DELETE_FAIL_WINDOW]: (state) => ({
    ...state,
    deleteFail: false
  })

}, initialState);

export const getAllLocals = () => (dispatch, getState) => {
  dispatch({ type: GET_ALL_LOCALS });

  localsApi.getAllLocals()
    .then((locals) => dispatch(getAllLocalsSuccess(locals)))
    .catch(() => dispatch(getAllLocalsFailure()));
}

export const getAllMotives = () => (dispatch, getState) => {
  dispatch({ type: GET_ALL_MOTIVES });

  localsApi.getAllMotives()
    .then((motives) => dispatch(getAllMotivesSuccess(motives)))
    .catch(() => dispatch(getAllMotivesFailure()));
}

export const addNewLocal = (local) => (dispatch, getState) => {
  dispatch({ type: ADD_NEW_LOCAL });
  
  localsApi.addLocal(local)
    .then(() => dispatch(addNewLocalSuccess()))
    .then(() => dispatch(getAllLocals()))
    .catch(() => dispatch(addNewLocalFailure()));
}

export const updateLocal = (id, local) => (dispatch, getState) => {
  dispatch({ type: UPDATE_LOCAL });
  
  localsApi.updateLocal(id, local)
    .then(() => dispatch(updateLocalSuccess()))
    .then(() => dispatch(getAllLocals()))
    .catch(() => dispatch(updateLocalFailure()));
}

export const deleteLocal = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_LOCAL });
  
  localsApi.deleteLocal(id)
    .then(() => dispatch(deleteLocalSuccess()))
    .then(() => dispatch(getAllLocals()))
    .catch(() => dispatch(deleteLocalFailure()));
}

export const getLocalsWithSelectedMotive = (motive) => (dispatch, getState) => {
  dispatch({ type: GET_LOCALS_WITH_SELECTED_MOTIVE });

  localsApi.getLocalsWithSelectedMotive(motive)
    .then((locals) => dispatch(getLocalsWithSelectedMotiveSuccess(locals)))
    .catch(() => dispatch(getLocalsWithSelectedMotiveFailure()));
}

export const getAllLocalsSuccess = createAction(GET_ALL_LOCALS_SUCCESS);
export const getAllLocalsFailure = createAction(GET_ALL_LOCALS_FAILURE);
export const getAllMotivesSuccess = createAction(GET_ALL_MOTIVES_SUCCESS);
export const getAllMotivesFailure = createAction(GET_ALL_MOTIVES_FAILURE);
export const addNewLocalSuccess = createAction(ADD_NEW_LOCAL_SUCCESS);
export const addNewLocalFailure = createAction(ADD_NEW_LOCAL_FAILURE);
export const updateLocalSuccess = createAction(UPDATE_LOCAL_SUCCESS);
export const updateLocalFailure = createAction(UPDATE_LOCAL_FAILURE);
export const deleteLocalSuccess = createAction(DELETE_LOCAL_SUCCESS);
export const deleteLocalFailure = createAction(DELETE_LOCAL_FAILURE);
export const getLocalsWithSelectedMotiveSuccess = createAction(GET_LOCALS_WITH_SELECTED_MOTIVE_SUCCESS);
export const getLocalsWithSelectedMotiveFailure = createAction(GET_LOCALS_WITH_SELECTED_MOTIVE_FAILURE);
export const closeDeleteFailWindow = createAction(CLOSE_DELETE_FAIL_WINDOW);


