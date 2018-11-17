import { CREATE_DOCUMENT, RETRIEVE_DOCUMENT, UPDATE_DOCUMENT, DELETE_DOCUMENT }
  from '../actions/actions_document';

export default function(state = "", action){
  switch(action.type){
    case CREATE_DOCUMENT:
      return state;
    case RETRIEVE_DOCUMENT:
      return action.type.text;
    case UPDATE_DOCUMENT:
      return state;
    case DELETE_DOCUMENT:
      return state;
    default:
      return state;
  }
}
