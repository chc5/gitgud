import axios from 'axios';
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";

export const SIGNED_UP = "SIGNED_UP";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const LOGGED_IN = "LOGGED_IN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

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
        type: LOGGED_OUT,
        payload: response
      }))
  }
}
