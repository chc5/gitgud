import {
  UPDATE_TEXT_FIELD
} from '../constants/types_ui';
import {
  RETRIEVE_DOCUMENT
} from '../constants/types_document_action';
// console.log(UPDATE_TEXT_FIELD);
export default function(state = "", action){
  switch(action.type){
    case UPDATE_TEXT_FIELD:
      return action.payload.data;
    case RETRIEVE_DOCUMENT:
      return action.payload.document.content;
    default:
      return state;
  }
}
