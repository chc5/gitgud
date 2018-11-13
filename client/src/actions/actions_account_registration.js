import axios from 'axios';
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";

export function login(data){
  console.log(data);
  const request = axios.post(`/api/account/login`, data);
  return {
    type: LOGIN,
    payload: request
  }
}

// export function signup()
