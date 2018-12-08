import {
  RETRIEVE_DOC_COMPLAINT_LIST
} from '../constants/types_doc_complaint_action';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_DOC_COMPLAINT_LIST:
      return action.payload.docComplaintList;
    default:
      return state;
  }
}
