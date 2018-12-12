import {
  RETRIEVE_USER_LIST
} from '../constants/types_user_profile';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_USER_LIST:
      console.log("NEED TO SET THE STATE OF USER LIST IN REDUCER");
      return state;
    default:
      return state;
  }
}
