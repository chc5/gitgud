import axios from 'axios';
import {
  SIGNED_UP,
  SIGNUP_FAILED,
  LOGGED_IN,
  LOGIN_FAILED,
  LOGGED_OUT,
  LOGOUT_FAILED
} from '../constants/types_account_action';

export function login(data, history){
  console.log("LOGGING IN...", data);
  const url = `/api/account/login`;
  return (dispatch) => {
    axios.post(url, data)
      .then((response) => {
        dispatch({
          type: LOGGED_IN,
          payload: response
        });
        history.push(`/`);
      })
      .catch((response) => dispatch({
        type: LOGIN_FAILED,
        payload: response
      }))
  }
}

export function signup(data, history){
  console.log("SIGNING UP ... ", data);
  const url = `/api/account/signup`;
  return (dispatch) => {
    axios.post(url, data)
      .then((response) => {
        dispatch({
          type: SIGNED_UP,
          payload: response
        });
        history.push(`/login`);
      })
      .catch((response) => dispatch({
        type: SIGNUP_FAILED,
        payload: response
      }))
  }
}
export function logout(history){
  console.log("LOGGING OUT....");
  const url = `/api/account/logout`;
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        dispatch({
          type: LOGGED_OUT,
          payload: response
        });
        history.push(`/`);
      })
      .catch((response) => dispatch({
        type: LOGOUT_FAILED,
        payload: response
      }))
  }
}
