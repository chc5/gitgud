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
  const url = `/api/account/login`;
  return (dispatch) =>
    axios.post(url, data)
      .then((response) => {
        history.push(`/`);
        return dispatch({
          type: LOGGED_IN,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: LOGIN_FAILED,
        payload: error.response.data
      }));
}

export function signup(data, history){
  const url = `/api/account/signup`;
  return (dispatch) =>
    axios.post(url, data)
      .then((response) => {
        history.push(`/login`);
        return dispatch({
          type: SIGNED_UP,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: SIGNUP_FAILED,
        payload: error.response.data
      }));
}
export function logout(history){
  const url = `/api/account/logout`;
  return (dispatch) =>
    axios.get(url)
      .then((response) => {
        history.push(`/`);
        return dispatch({
          type: LOGGED_OUT,
          payload: response.data
        });
      })
      .catch((error) => dispatch({
        type: LOGOUT_FAILED,
        payload: error.response.data
      }));
}
