import {
  RETRIEVE_DOC_COMPLAINT,
  RESET_DOC_COMPLAINT
} from '../constants/types_doc_complaint_action';

export default function(state = null, action){
  switch(action.type){
    case RETRIEVE_DOC_COMPLAINT:
      return action.payload.docComplaint;
    case RESET_DOC_COMPLAINT:
      console.log("RESETTING....");
      return null;
    default:
      return state;
  }
}
