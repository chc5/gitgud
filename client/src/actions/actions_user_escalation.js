import axios from 'axios';

import {
  CREATE_USER,
  RETRIEVE_USER,
  UPDATE_USER,
  DELETE_USER,
  RETRIEVE_USER_LIST
} from '../constants/types_user_action';

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
