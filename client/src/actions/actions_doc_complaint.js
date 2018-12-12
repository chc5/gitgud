import axios from 'axios';

import {
  CRUD_DOC_COMPLAINT_ERROR
} from '../constants/types_error';

import {
  CREATE_DOC_COMPLAINT,
  RETRIEVE_DOC_COMPLAINT_LIST,
  RETRIEVE_DOC_COMPLAINT,
  PROCESS_DOC_COMPLAINT,
  DELETE_DOC_COMPLAINT,
  RESET_DOC_COMPLAINT
} from '../constants/types_doc_complaint_action';

export function resetDocComplaint(){
  return {
    type: RESET_DOC_COMPLAINT
  }
}

export function retrieveAllDocComplaint(){
  let url = `/api/complaints/docs/retrieveAll`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => dispatch({
        type: RETRIEVE_DOC_COMPLAINT_LIST,
        payload: response.data
      }))
      .catch((error) => dispatch({
        type: CRUD_DOC_COMPLAINT_ERROR,
        payload: error.response.data
      }));
  }
}

export function createDocComplaint(documentId, revisionId, text){
  let url = `/api/complaints/docs/create`;
  return (dispatch) => {
    axios.post(url, { documentId, revisionId, text })
      .then((response) => {
        dispatch({
          type: CREATE_DOC_COMPLAINT,
          payload: response.data
        });
        dispatch(retrieveAllDocComplaint());
      })
      .catch((error) => {
        dispatch({
          type: CRUD_DOC_COMPLAINT_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function retrieveDocComplaint(complaintId){
  let url = `/api/complaints/docs/retrieve/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        console.log(response);
        dispatch({
          type: RETRIEVE_DOC_COMPLAINT,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: CRUD_DOC_COMPLAINT_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function retrieveDocComplaintForDoc(documentId){
  let url = `/api/complaints/docs/retrieveForDoc`;
  return (dispatch) => {
    axios.post(url, { getProcessed: documentId })
      .then((response) => console.log("retrieveDocComplaintForDoc", response))
      .catch((error) => console.log("retrieveDocComplaintForDoc", error));
  }
}

export function processDocComplaint(complaintId){
  let url = `/api/complaints/docs/process/${complaintId}`;
  return (dispatch) =>
    new Promise((resolve, reject) => {
      axios.post(url)
        .then((response) => {
          dispatch({
            type: PROCESS_DOC_COMPLAINT,
            payload: response.data
          });
          dispatch(resetDocComplaint());
          resolve(true);
        })
        .catch((error) => {
          dispatch({
            type: CRUD_DOC_COMPLAINT_ERROR,
            payload: error.response.data
          });
          reject(false);
        });
    })
}

export function deleteDocComplaint(complaintId){
  let url = `/api/complaints/docs/delete/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: DELETE_DOC_COMPLAINT,
          payload: response.data
        });
        dispatch(retrieveAllDocComplaint());
      })
      .catch((error) => {
        dispatch({
          type: CRUD_DOC_COMPLAINT_ERROR,
          payload: error.response.data
        });
      });
  }
}
