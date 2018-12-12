import {
  RETRIEVE_ALL_PROMOTION
} from '../constants/types_promotion';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_ALL_PROMOTION:
      return action.payload.promotionList;
    default:
      return state;
  }
}
