import { LOGGED_IN, LOGGED_OUT } from '../actions/actions_account_registration';
export default function(state = null, action){
  switch(action.type){
    case LOGGED_IN:
      return action.payload.data.userInfo;
    case LOGGED_OUT:
      return null;
    default:
      return state;
  }
}
