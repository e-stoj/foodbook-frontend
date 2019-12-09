import { get, toJSON, put, post, del } from "../utils/index";

export const getUserEvents = (id) => get(`http://localhost:8000/users/${id}/events`).then(toJSON);

export const addEvent = (localId, event, query) => 
  post(`http://localhost:8000/locals/${localId}/add-event${query}`, event).then(toJSON);
  
export const updateEvent = (id) => 
  put(`http://localhost:8000/events/${id}`).then(toJSON);

export const deleteEvent = (id) => 
  del(`http://localhost:8000/events/${id}`).then(toJSON);

export const addMessage = (eventId, userId, message) => 
  post(`http://localhost:8000/events/${eventId}/add-message/${userId}`, message).then(toJSON);

export const getEventParticipants = (eventId) => 
  get(`http://localhost:8000/events/${eventId}/participants`).then(toJSON);
  
export const getEventMessages = (eventId) => 
  get(`http://localhost:8000/events/${eventId}/messages`).then(toJSON);
