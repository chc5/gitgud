import {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  CRUD_DOC_ERROR
} from '../constants/types_document_action';

import {
  SIGNED_UP,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  LOGGED_OUT,
  LOGOUT_FAILED
} from '../constants/types_account_action';

export default function(state = "", action){
  if(action.payload){
    if(action.payload.msg){
      return action.payload.msg;
    }
    else if(action.payload.error){
      return action.payload.error;
    }
  }
  return state;
}
