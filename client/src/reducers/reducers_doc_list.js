import {
  RETRIEVE_DOCUMENT_LIST
} from '../constants/types_document_action';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_DOCUMENT_LIST:
      return action.payload.documentList;
    default:
      return state;
  }
}
