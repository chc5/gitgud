import {
  CRUD_DOC_ERROR
} from '../constants/types_error';
export default function(state = null, action){
	switch(action.type){
		case CRUD_DOC_ERROR:
      console.log(action.payload);
      return state;
    default:
      return state;
	}
}
