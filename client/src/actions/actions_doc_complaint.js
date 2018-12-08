import axios from 'axios';

import {
  CRUD_DOC_COMPLAINT_ERROR
} from '../constants/types_error';

import {
  RETRIEVE_DOC_COMPLAINT_LIST
} from '../constants/types_doc_complaint_action';

export function createDocComplaint(documentId, revisionId, text){
  let url = `/api/complaints/docs/create`;
  return (dispatch) => {
    axios.post(url, { documentId, revisionId, text })
      .then((response) => console.log("createDocComplaint", response))
      .catch((error) => console.log("createDocComplaint", error));
  }
}

export function retrieveDocComplaint(complaintId){
  let url = `/api/complaints/docs/retrieve/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => console.log("createDocComplaint", response))
      .catch((error) => console.log("createDocComplaint", error));
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
        payload: error
      }));
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
  return (dispatch) => {
    axios.post(url)
      .then((response) => console.log("processDocComplaint", response))
      .catch((error) => console.log("processDocComplaint", error));
  }
}

export function deleteDocComplaint(complaintId){
  let url = `/api/complaints/docs/delete/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => console.log("deleteeDocComplaint", response))
      .catch((error) => console.log("deleteDocComplaint", error));
  }
}
