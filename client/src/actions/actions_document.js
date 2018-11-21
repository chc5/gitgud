import axios from 'axios';

import { UPDATE_TEXT_FIELD } from './actions_text_field';

// Document List CONST
export const RETRIEVE_DOCUMENT_LIST = "RETRIEVE_DOCUMENT_LIST";

// CRUD CONST
export const CREATE_DOCUMENT = "CREATE_DOCUMENT";
export const RETRIEVE_DOCUMENT = "RETRIEVE_DOCUMENT";
export const UPDATE_DOCUMENT = "UPDATE_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";

// ERROR CONST
export const CRUD_DOC_ERROR = "CRUD_DOC_ERROR";



export function createDocument(docName, history){
  let url = `/api/docs/create`;
  return (dispatch) => {
    axios.post(url, { title: docName, content: "\n"})
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
