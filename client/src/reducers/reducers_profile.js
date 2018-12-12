import {
  RETRIEVE_PROFILE
} from '../constants/types_profile_action';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_PROFILE:
      console.log("NEED TO SET THE STATE OF PROFILE IN REDUCER");
      return state;
    default:
      return state;
  }
}
