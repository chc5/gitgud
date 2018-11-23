import {
  LOGGED_IN,
  LOGGED_OUT
} from '../constants/types_account_action';

import {
  USER_INFO_STORAGE
} from '../constants/types_session_storage';

const initState = JSON.parse(sessionStorage.getItem(USER_INFO_STORAGE)) || null;
// console.log(JSON.parse(sessionStorage.getItem(USER_INFO_STORAGE)));
const reducer = (state = initState, action) => {
  switch(action.type){
    case LOGGED_IN:
      const userInfo = action.payload.data.userInfo;
      const jsonstring = JSON.stringify(userInfo);
      sessionStorage.setItem(USER_INFO_STORAGE, jsonstring);
      console.log("check curr storage", sessionStorage.getItem(USER_INFO_STORAGE));
      return action.payload.data.userInfo;
    case LOGGED_OUT:
      sessionStorage.removeItem(USER_INFO_STORAGE);
      return null;
    default:
      return state;
  }
}

export default reducer;
