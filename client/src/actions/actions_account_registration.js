import axios from 'axios';
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";

export function login(data){
  console.log(data);
  const request = axios.post(`/api/account/login`, data);
  return {
    type: LOGGED_IN,
    payload: request
  }
}

// export function signup()
