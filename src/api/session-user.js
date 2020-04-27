import { toJSON, toJSON1, post } from '../utils/index';

export const register = (user) => post('http://localhost:8000/registration', user).then(toJSON1);

export const logIn = (body) => post('http://localhost:8000/login', body).then(toJSON);