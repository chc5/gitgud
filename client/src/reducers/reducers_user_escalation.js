import {
  CREATE_USER,
  RETRIEVE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../constants/types_user_action';

export default function(state = "", action){
  switch(action.type){
    case CREATE_USER:
      return state;
    case RETRIEVE_USER:
      return state;
    case UPDATE_USER:
      return state;
    case DELETE_USER:
      return state;
    default:
      return state;
  }
}
