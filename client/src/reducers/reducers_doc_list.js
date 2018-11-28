import {
  CREATE_DOCUMENT,
  DELETE_DOCUMENT,
  RETRIEVE_DOCUMENT_LIST
} from '../constants/types_document_action';

export default function(state = [], action){
  switch(action.type){
    case CREATE_DOCUMENT:
      return state;
    case DELETE_DOCUMENT:
      return state;
    case RETRIEVE_DOCUMENT_LIST:
      return action.payload.documentList;
    default:
      return state;
  }
}
