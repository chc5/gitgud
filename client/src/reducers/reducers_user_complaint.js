import {
  RETRIEVE_USER_COMPLAINT,
  RESET_USER_COMPLAINT
} from '../constants/types_user_complaint_action';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_USER_COMPLAINT:
      return action.payload.userComplaint;
    case RESET_USER_COMPLAINT:
      return null;
    default:
      return state;
  }
}
