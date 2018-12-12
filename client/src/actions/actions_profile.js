import axios from 'axios';

import {
  CRUD_PROFILE_ERROR
} from '../constants/types_error';

import {
  CREATE_PROFILE,
  RETRIEVE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  RETRIEVE_PROFILE_LIST
} from '../constants/types_profile_action';

export function retrieveAllProfiles(){
  let url = `/api/account/retrieveProfileList`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: RETRIEVE_PROFILE_LIST,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: CRUD_PROFILE_ERROR,
          payload: error.response.data
        });
      })
  }
}

export function createProfile(summary, img){
  let url = `/api/account/createProfile`;
  return (dispatch) => {
    axios.post(url, { summary, img })
      .then((response) => dispatch({
        type: CREATE_PROFILE,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: CRUD_PROFILE_ERROR,
        payload: error.response.data
      }))
  }
}

export function retrieveProfile(userId){
  let url = `/api/account/retrieveProfile`;
  return (dispatch) => {
    axios.post(url, { userId })
      .then((response) => {
        console.log("retrieveProfile", response);
        dispatch({
          type: RETRIEVE_PROFILE,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: CRUD_PROFILE_ERROR,
        payload: error.response.data
      }))
  }
}

export function updateProfile(summary, img){
  let url = `/api/account/updateProfile`;
  return (dispatch) => {
    axios.post(url, { summary, img })
      .then((response) => dispatch({
        type: UPDATE_PROFILE,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: CRUD_PROFILE_ERROR,
        payload: error.response.data
      }))
  }
}

export function deleteProfile(){
  let url = `/api/aacount/deleteProfile`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: DELETE_PROFILE,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: CRUD_PROFILE_ERROR,
        payload: error.response.data
      }))
  }
}
