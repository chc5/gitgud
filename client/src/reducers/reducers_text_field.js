import { UPDATE_TEXT_FIELD } from '../actions/index';
// console.log(UPDATE_TEXT_FIELD);
export default function(state = "Reducer working", action){
  switch(action.type){
    case UPDATE_TEXT_FIELD:
      return action.payload.data;
    default:
      return state;
  }
}
