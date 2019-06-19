import { get, toJSON, put, post } from "../utils/index";

export const getAllLocals = () => get(`http://localhost:8000/locals`).then(toJSON);

export const getAllMotives = () => get(`http://localhost:8000/locals/motives`).then(toJSON);

export const addLocal = (local) => post(`http://localhost:8000/locals`, local).then(toJSON);

export const getLocalsWithSelectedMotive = (motive) => get(`http://localhost:8000/locals/${motive}`).then(toJSON);




