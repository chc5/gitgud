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
  switch(action.type){
    case CREATE_DOCUMENT:
      return action.payload.msg;
    case UPDATE_DOCUMENT:
      return action.payload.msg;
    case DELETE_DOCUMENT:
      console.log(action);
      return action.payload.msg;
    case LOGIN_FAILED:
      return state;
    case SIGNED_UP:
      return action.payload.msg;
    case SIGNUP_FAILED:
      return action.payload.msg;
    case LOGGED_OUT:
      return action.payload.msg;
    case LOGOUT_FAILED:
      return action.payload.msg;
    case CRUD_DOC_ERROR:
      console.log(action);
      return state;
    default:
      return state;
  }
}
