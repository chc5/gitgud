import { UPDATE_TEXT_FIELD } from '../actions/actions_text_field';
import { RETRIEVE_DOCUMENT } from '../actions/actions_document';
// console.log(UPDATE_TEXT_FIELD);
export default function(state = "Insert here.", action){
  switch(action.type){
    case UPDATE_TEXT_FIELD:
      return action.payload.data;
    case RETRIEVE_DOCUMENT:
      return action.payload.document.content;
    default:
      return state;
  }
}
