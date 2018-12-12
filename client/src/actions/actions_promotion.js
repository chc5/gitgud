import axios from 'axios';

import {
  PROMOTION_ERROR
} from '../constants/types_error';

import {
  CREATE_PROMOTION,
  RETRIEVE_ALL_PROMOTION,
  APPROVE_USER_PROMOTION,
  DENY_USER_PROMOTION,
  PROMOTE_USER,
  DEMOTE_USER
} from '../constants/types_promotion';

import {
  retrieveAllProfiles
} from './actions_profile';

export function createPromotion(content){
  let url = `/api/promotion/create`;
  return (dispatch) => {
    axios.post(url, { content })
      .then((response) => {
        dispatch({
          type: CREATE_PROMOTION,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      })
  }
}

export function retrieveAllPromotion(){
  let url = `/api/promotion/retrieveAll`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: RETRIEVE_ALL_PROMOTION,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function approveUserPromotion(promotionId){
  let url = `/api/promotion/approve/${promotionId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: APPROVE_USER_PROMOTION,
          payload: response.data
        });
        dispatch(retrieveAllPromotion());
        dispatch(retrieveAllProfiles());
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function denyUserPromotion(promotionId){
  let url = `/api/promotion/deny/${promotionId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: DENY_USER_PROMOTION,
          payload: response.data
        });
        dispatch(retrieveAllPromotion());
        dispatch(retrieveAllProfiles());
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function promoteUser(userId){
  let url = `/api/promotion/promote/${userId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: PROMOTE_USER,
          payload: response.data
        });
        dispatch(retrieveAllPromotion());
        dispatch(retrieveAllProfiles());
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      });
  }
}

export function demoteUser(userId){
  let url = `/api/promotion/demote/${userId}`;
  return (dispatch) => {
    axios.post(url)
      .then((response) => {
        dispatch({
          type: DEMOTE_USER,
          payload: response.data
        });
        dispatch(retrieveAllPromotion());
        dispatch(retrieveAllProfiles());
      })
      .catch((error) => {
        dispatch({
          type: PROMOTION_ERROR,
          payload: error.response.data
        });
      });
  }
}
