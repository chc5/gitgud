import axios from 'axios';

// CRUD
export const CREATE_USER = "CREATE_USER";
export const RETRIEVE_USER = "RETRIEVE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function createUser(name){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: CREATE_USER,
    payload: request
  }
}

export function retrieveUser(userId){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: RETRIEVE_USER,
    payload: request
  }
}

export function updateUser(textField){
  let url = `/`;
  const request = axios.post(url, { textField });
  return {
    type: UPDATE_USER,
    payload: request
  };
}

export function deleteUser(userId){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: DELETE_USER,
    payload: request
  };
}
