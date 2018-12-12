import axios from 'axios';
import {
  retrieveAllDocument, retrieveDocument
} from './actions_document';
import {
  LOCK_DOCUMENT,
  UNLOCK_DOCUMENT,
  LOCK_ERROR,
  UNLOCK_ERROR
} from '../constants/types_document_action';

export function lockDocument(documentId, history){
  let url = `/api/docs/lock/${documentId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: LOCK_DOCUMENT,
          payload: response.data
        });
        dispatch(retrieveAllDocument());
        dispatch(retrieveDocument(documentId));
        history.push(`/docs/${documentId}`);
      })
      .catch((error) => {
        dispatch({
          type: LOCK_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function unlockDocument(documentId, history){
  let url = `/api/docs/unlock/${documentId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: UNLOCK_DOCUMENT,
          payload: response.data
        });
        dispatch(retrieveAllDocument());
        history.push(`/docs`);
      })
      .catch((error) => {
        dispatch({
          type: UNLOCK_ERROR,
          payload: error.response.data
        });
      });
  }
}
