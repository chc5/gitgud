import axios from 'axios';

import {
  CRUD_DOC_ERROR
} from '../constants/types_error';

import {
  CREATE_DOCUMENT,
  RETRIEVE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  RETRIEVE_DOCUMENT_LIST,
  INVITATION_SUCCESSFUL,
  INVITATION_UNSUCCESSFUL
} from '../constants/types_document_action';

export function retrieveAllDocument(){
  let url = `/api/docs/retrieveAll`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: RETRIEVE_DOCUMENT_LIST,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: CRUD_DOC_ERROR,
          payload: error.response.data
        });
      })
  }
}

export function createDocument(docName, history){
  let url = `/api/docs/create`;
  return (dispatch) => {
    axios.post(url, { title: docName })
      .then((response) => {
        dispatch({
          type: CREATE_DOCUMENT,
          payload: response.data
        });
        dispatch(retrieveAllDocument());
      })
      .catch((error) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: error.response.data
      }));
  }
}

export function retrieveDocument(documentId, revisionId){
  let url = `/api/docs/retrieve/${documentId}`;
  return (dispatch) => {
    axios.post(url, { revisionId })
      .then((response) => {
        dispatch({
          type: RETRIEVE_DOCUMENT,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: CRUD_DOC_ERROR,
        payload: error.response.data
      }))
  }
}

export function updateDocument(documentId, textField){
  let url = `/api/docs/update/${documentId}`;
  return (dispatch) => {
    axios.post(url, { textField })
      .then((response) => dispatch({
        type: UPDATE_DOCUMENT,
        payload: response.data
      }))
      .catch((error) => {dispatch({
        type: CRUD_DOC_ERROR,
        payload: error.response.data
      })})
  }
}

export function deleteDocument(documentId, history){
  let url = `/api/docs/delete/${documentId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: DELETE_DOCUMENT,
          payload: response.data
        });
        dispatch(retrieveAllDocument());
      })
      .catch((error) => {
        dispatch({
          type: CRUD_DOC_ERROR,
          payload: error.response.data
        });
      })
  }
}

export function inviteUsersToDoc(documentId, username, permission){
  let url = `/api/docs/documentId/invite`;
  return (dispatch) =>
    new Promise((resolve, reject) => {
      axios.post(url, { username, permission })
        .then((response) => {
          dispatch({
            type: INVITATION_SUCCESSFUL,
            payload: response.data
          });
          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: INVITATION_UNSUCCESSFUL,
            payload: error.response.data
          });
          reject(false);
        });
    });
}
