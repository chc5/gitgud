import axios from 'axios';

export function createUserComplaint(targetUserId, text){
  let url = `/api/complaints/users/create`;
  return (dispatch) => {
    axios.post(url, { targetUserId, text })
      .then((response) => console.log("createUserComplaint", response))
      .catch((error) => console.log("createUserComplaint", error));
  }
}

export function retrieveUserComplaint(complaintId){
  let url = `/api/complaints/users/retrieve/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => console.log("retrieveUserComplaint", response))
      .catch((error) => console.log("retrieveUserComplaint", error));
  }
}

export function retrieveAllUserComplaint(){
  let url = `/api/complaints/users/retrieveAll`;
  return (dispatch) => {
    axios.post(url)
      .then((response)) => console.log("retrieveAllUserComplaint", response))
      .catch((error) => console.log("retrieveAllUserComplaint", error));
  }
}

export function retrieveUserComplaintFromUser(userId){
  let url = `/api/complaints/users/retrieveFromUser`;
  return (dispatch) => {
    axios.post(url, { getProcessed: userId })
      .then((response)) => console.log("retrieveUserComplaintFromUser", response))
      .catch((error) => console.log("retrieveUserComplaintFromUser", error));
  }
}

export function retrieveUserComplaintForUser(userId){
  let url = `/api/complaints/users/retrieveForUser`;
  return (dispatch) => {
    axios.post(url, { getProcessed: userId })
      .then((response)) => console.log("retrieveUserComplaintForUser", response))
      .catch((error) => console.log("retrieveUserComplaintForUser", error));
  }
}

export function processUserComplaint(complaintId){
  let url = `/api/complaints/users/process/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response)) => console.log("processUserComplaint", response))
      .catch((error) => console.log("processUserComplaint", error));
  }
}

export function deleteUserComplaint(complaintId){
  let url = `/api/complaints/users/delete/${complaintId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response)) => console.log("deleteUserComplaint", response))
      .catch((error) => console.log("deleteUserComplaint", error));
  }
}
