import { RETRIEVE_DOCUMENT_LIST }
  from '../actions/actions_document';

export default function(state = [], action){
  switch(action.type){
    case RETRIEVE_DOCUMENT_LIST:
      console.log(action);
      return action.payload.data.documentList;
    default:
      return state;
  }
}
