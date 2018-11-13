import { UPDATE_TEXT_FIELD } from '../actions/actions_text_field';
// console.log(UPDATE_TEXT_FIELD);
export default function(state = "Insert here.", action){
  switch(action.type){
    case UPDATE_TEXT_FIELD:
      return action.payload.data;
    default:
      return state;
  }
}
