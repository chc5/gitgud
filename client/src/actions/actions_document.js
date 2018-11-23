import axios from 'axios';

import {
  CRUD_DOC_ERROR
} from '../constants/types_error';

import {
  CREATE_DOCUMENT,
  RETRIEVE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  RETRIEVE_DOCUMENT_LIST
} from '../constants/types_document_action';




export function createDocument(docName, history){
  let url = `/api/docs/create`;
  return (dispatch) => {
    axios.post(url, { title: docName, content: "" })
      .then((response) => dispatch({
        type: CREATE_DOCUMENT,
        payload: response
      }))
      .catch((response) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: response
      }))
  }
}

export function retrieveDocument(documentId){
  console.log(documentId);
  let url = `/api/docs/retrieve/${documentId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: RETRIEVE_DOCUMENT,
          payload: response.data
        });
      })
      .catch((response) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: response
      }))
  }
}

export function updateDocument(documentId, textField){
  console.log("update", documentId);
  let url = `/api/docs/update/${documentId}`;
  return (dispatch) => {
    axios.post(url, { textField })
      .then((response) => dispatch({
        type: UPDATE_DOCUMENT,
        payload: response
      }))
      .catch((response) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: response
      }))
  }
}

export function deleteDocument(documentId){
  let url = `/api/docs/delete/${documentId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => dispatch({
        type: DELETE_DOCUMENT,
        payload: response
      }))
      .catch((response) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: response
      }))
  }
}

export function retrieveAllDocument(){
  let url = `/api/docs/retrieveAll`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: RETRIEVE_DOCUMENT_LIST,
          payload: response
        });
      })
      .catch((response) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: response
      }))
  }
}
