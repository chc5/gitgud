import { RETRIEVE_DOCUMENT_LIST }
  from '../actions/actions_document';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_DOCUMENT_LIST:
      return action.payload.data.docList;
    default:
      return state;
  }
}
