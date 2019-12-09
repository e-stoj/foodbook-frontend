import { handleActions, createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import * as eventApi from '../../api/event';

const initialState = {
  eventsList: [],
  participants: [],
  messages: [],
  showEventPage: false,
};

export const GET_USER_EVENTS = 'events: get-user-events';
const GET_USER_EVENTS_SUCCESS = 'events: get-user-events-success';
const GET_USER_EVENTS_FAILURE = 'events: get-user-events-failure';
export const ADD_NEW_EVENT = 'events: add-new-event';
const ADD_NEW_EVENT_SUCCESS = 'events: add-new-event-success';
const ADD_NEW_EVENT_FAILURE = 'events: add-new-event-failure';
export const UPDATE_EVENT = 'events: update-event';
const UPDATE_EVENT_SUCCESS = 'events: update-event-success';
const UPDATE_EVENT_FAILURE = 'events: update-event-failure';
export const DELETE_EVENT = 'events: delete-event';
const DELETE_EVENT_SUCCESS = 'events: delete-event-success';
const DELETE_EVENT_FAILURE = 'events: delete-event-failure';
export const ADD_NEW_MESSAGE = 'events: add-new-message';
const ADD_NEW_MESSAGE_SUCCESS = 'events: add-new-message-success';
const ADD_NEW_MESSAGE_FAILURE = 'events: add-new-message-failure';
export const GET_EVENT_PARTICIPANTS = 'events: get-event-participants';
const GET_EVENT_PARTICIPANTS_SUCCESS = 'events: get-event-participants-success';
const GET_EVENT_PARTICIPANTS_FAILURE = 'events: get-event-participants-failure';
export const GET_EVENT_MESSAGES = 'events: get-event-messages';
const GET_EVENT_MESSAGES_SUCCESS = 'events: get-event-messages-success';
const GET_EVENT_MESSAGES_FAILURE = 'events: get-event-messages-failure';
export const HANDLE_OPEN_EVENT_PAGE = 'events: handle-open-event-page';

export const eventReducer = handleActions({
  [GET_USER_EVENTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    eventsList: payload
  }),

  [GET_EVENT_PARTICIPANTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    participants: payload
  }),

  [GET_EVENT_MESSAGES_SUCCESS]: (state, { payload }) => ({
    ...state, 
    messages: payload
  }),

  [HANDLE_OPEN_EVENT_PAGE]: (state) => ({
    ...state,
    showEventPage: !state.showEventPage
  }),

}, initialState);

export const getUserEvents = (id) => (dispatch, getState) => {
  dispatch({ type: GET_USER_EVENTS });

  eventApi.getUserEvents(id)
    .then((events) => dispatch(getUserEventsSuccess(events)))
    .catch(() => dispatch(getUserEventsFailure()));
}

export const addNewEvent = (localId, event, query) => (dispatch, getState) => {
  dispatch({ type: ADD_NEW_EVENT });
  
  eventApi.addEvent(localId, event, query)
    .then(() => dispatch(addNewEventSuccess()))
    .then(() => dispatch(push('/home')))
    .catch(() => dispatch(addNewEventFailure()));
}

export const updateEvent = (id) => (dispatch, getState) => {
  dispatch({ type: UPDATE_EVENT });
  
  eventApi.updateEvent(id)
    .then(() => dispatch(updateEventSuccess()))
    .catch(() => dispatch(updateEventFailure()));
}

export const deleteEvent = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_EVENT });
  
  eventApi.deleteEvent(id)
    .then(() => dispatch(deleteEventSuccess()))
    .catch(() => dispatch(deleteEventFailure()));
}

export const addNewMessage = (eventId, userId, message) => (dispatch, getState) => {
  dispatch({ type: ADD_NEW_MESSAGE });

  eventApi.addMessage(eventId, userId, message)
    .then(() => dispatch(addNewMessageSuccess()))
    .then(() => dispatch(getEventMessages(eventId)))
    .catch(() => dispatch(addNewMessageFailure()));
}

export const getEventParticipants = (eventId) => (dispatch, getState) => {
  dispatch({ type: GET_EVENT_PARTICIPANTS });

  eventApi.getEventParticipants(eventId) 
    .then((participants) => dispatch(getEventParticipantsSuccess(participants)))
    .catch(() => dispatch(getEventParticipantsFailure()))
}

export const getEventMessages = (eventId) => (dispatch, getState) => {
  dispatch({ type: GET_EVENT_MESSAGES });

  eventApi.getEventMessages(eventId)
    .then((messages) => dispatch(getEventMessagesSuccess(messages)))
    .catch(() => dispatch(getEventMessagesFailure()));
}

export const getUserEventsSuccess = createAction(GET_USER_EVENTS_SUCCESS);
export const getUserEventsFailure = createAction(GET_USER_EVENTS_FAILURE);
export const addNewEventSuccess = createAction(ADD_NEW_EVENT_SUCCESS);
export const addNewEventFailure = createAction(ADD_NEW_EVENT_FAILURE);
export const updateEventSuccess = createAction(UPDATE_EVENT_SUCCESS);
export const updateEventFailure = createAction(UPDATE_EVENT_FAILURE);
export const deleteEventSuccess = createAction(DELETE_EVENT_SUCCESS);
export const deleteEventFailure = createAction(DELETE_EVENT_FAILURE);
export const addNewMessageSuccess = createAction(ADD_NEW_MESSAGE_SUCCESS);
export const addNewMessageFailure = createAction(ADD_NEW_MESSAGE_FAILURE);
export const getEventParticipantsSuccess = createAction(GET_EVENT_PARTICIPANTS_SUCCESS);
export const getEventParticipantsFailure = createAction(GET_EVENT_PARTICIPANTS_FAILURE);
export const getEventMessagesSuccess = createAction(GET_EVENT_MESSAGES_SUCCESS);
export const getEventMessagesFailure = createAction(GET_EVENT_MESSAGES_FAILURE);
export const handleOpenEventPage = createAction(HANDLE_OPEN_EVENT_PAGE);


