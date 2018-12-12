import {
  RETRIEVE_PROFILE
} from '../constants/types_profile_action';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_PROFILE:
      return action.payload.profile;
    default:
      return state;
  }
}
