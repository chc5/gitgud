import axios from 'axios';
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";

export function login(data){
  console.log("LOGGING IN...", data);
  const request = axios.post(`/api/account/login`, data);
  return {
    type: LOGGED_IN,
    payload: request
  }
}

export function signup(data){
  console.log("SIGNING UP ... ", data);
  const request = axios.post(`/api/account/signup`, data);
  return {
    type: SIGNUP,
    payload: request
  }
}
export function logout(){
  console.log("LOGGING OUT....");
  const request = axios.get(`/api/account/logout`);
  return {
    type: LOGGED_OUT,
    payload: request
  }
}
