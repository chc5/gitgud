import {
  UPDATE_NAV_KEY,
  UPDATE_NAV_COLLAPSE
} from '../constants/types_ui';

export function updateNavKey(key){
  return {
    type: UPDATE_NAV_KEY,
    payload: key
  }
}

export function updateNavCollapse(){
  return{
    type: UPDATE_NAV_COLLAPSE
  }
}
