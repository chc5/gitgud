import {
  CREATE_DOCUMENT,
  RETRIEVE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT
} from '../constants/types_document_action';

export default function(state = "", action){
  switch(action.type){
    case CREATE_DOCUMENT:
      console.log(action);
      return state;
    case RETRIEVE_DOCUMENT:
      console.log(action);
      return action.payload.document;
    case UPDATE_DOCUMENT:
      return state;
    case DELETE_DOCUMENT:
      return state;
    default:
      return state;
  }
}
