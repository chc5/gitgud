import {
  RETRIEVE_USER_COMPLAINT_LIST
} from '../constants/types_user_complaint_action';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_USER_COMPLAINT_LIST:
      return action.payload.userComplaintList;
    default:
      return state;
  }
}
