import {
  RETRIEVE_PROFILE_LIST
} from '../constants/types_profile_action';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_PROFILE_LIST:
      return action.payload.profileList;
    default:
      return state;
  }
}
