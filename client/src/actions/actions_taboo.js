import axios from 'axios';

import {
  TABOO_ERROR
} from '../constants/types_error';

import {
  CREATE_TABOO_WORD,
  RETRIEVE_APPROVED_TABOO_WORDS,
  RETRIEVE_UNAPPROVED_TABOO_WORDS,
  APPROVE_TABOO_WORD,
  DELETE_TABOO_WORD
} from '../constants/types_taboo_action';

export function createTabooWord(word){
  let url = `/api/taboo/create`;
  return (dispatch) =>
    axios.post(url, { word })
      .then((response) => dispatch({
        type: CREATE_TABOO_WORD,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: TABOO_ERROR,
        payload: error.response.data
      }))
}

export function retrieveApprovedTabooWord(){
  let url = `/api/taboo/retrieveApproved`;
  return (dispatch) =>
    axios.post(url)
      .then((response) => dispatch({
        type: RETRIEVE_APPROVED_TABOO_WORDS,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: TABOO_ERROR,
        payload: error.response.data
      }))
}

export function retrieveUnapprovedTabooWord(){
  let url = `/api/taboo/retrieveUnapproved`;
  return (dispatch) =>
    axios.post(url)
      .then((response) => dispatch({
        type: RETRIEVE_UNAPPROVED_TABOO_WORDS,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: TABOO_ERROR,
        payload: error.response.data
      }))
}

export function approveTabooWord(tabooId){
  let url = `/api/taboo/approve/${tabooId}`;
  return (dispatch) =>
    axios.post(url)
      .then((response) => dispatch({
        type: APPROVE_TABOO_WORD,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: TABOO_ERROR,
        payload: error.response.data
      }))
}

export function deleteTabooWord(tabooId){
  let url = `/api/taboo/delete/${tabooId}`;
  return (dispatch) =>
    axios.post(url)
      .then((response) => dispatch({
        type: DELETE_TABOO_WORD,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: TABOO_ERROR,
        payload: error.response.data
      }))
}
