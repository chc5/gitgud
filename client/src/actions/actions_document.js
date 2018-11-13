import axios from 'axios';

// CRUD
export const CREATE_DOCUMENT = "CREATE_DOCUMENT";
export const RETRIEVE_DOCUMENT = "RETRIEVE_DOCUMENT";
export const UPDATE_DOCUMENT = "UPDATE_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";

export function createDocument(name){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: CREATE_DOCUMENT,
    payload: request
  }
}

export function retrieveDocument(documentId){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: RETRIEVE_DOCUMENT,
    payload: request
  }
}

export function updateDocument(textField){
  let url = `/`;
  const request = axios.post(url, { textField });
  return {
    type: UPDATE_DOCUMENT,
    payload: request
  };
}

export function deleteDocument(documentId){
  let url = `/`;
  const request = axios.get(url);
  return {
    type: DELETE_DOCUMENT,
    payload: request
  };
}
