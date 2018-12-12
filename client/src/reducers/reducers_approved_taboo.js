import {
  RETRIEVE_APPROVED_TABOO_WORDS
} from '../constants/types_taboo_action';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_APPROVED_TABOO_WORDS:
      return action.payload.tabooList;
    default:
      return state;
  }
}
