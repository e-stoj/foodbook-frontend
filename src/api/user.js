import { get, toJSON, put } from "../utils/index";

export const findFriend = (login) => get(`http://localhost:8000/users/${login}`).then(toJSON);

export const addFriend = (id, friend) => put(`http://localhost:8000/users/${id}`, friend).then(toJSON);

export const getUserFriends = (id) => get(`http://localhost:8000/users/${id}/friends`).then(toJSON);

export const deleteFriend = (id, friend) => put(`http://localhost:8000/users/${id}/friends`, friend).then(toJSON);
