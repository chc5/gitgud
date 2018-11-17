import { combineReducers } from 'redux';

import TextFieldReducer from './reducers_text_field';
import DocumentReducer from './reducers_document';
import ErrorReducer from './reducers_error';
const rootReducer = combineReducers({
  textField: TextFieldReducer,
  error: ErrorReducer,
  document: DocumentReducer
});

export default rootReducer;
