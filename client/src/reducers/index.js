import { combineReducers } from 'redux';

import TextFieldReducer from './reducers_text_field';
import DocumentReducer from './reducers_document';
import ErrorReducer from './reducers_error';
import DocumentListReducer from './reducers_doc_list';
import UserInfoReducer from './reducers_user_info';
import NavigationBarReducer from './reducers_navigation_bar';

const rootReducer = combineReducers({
  textField: TextFieldReducer,
  error: ErrorReducer,
  document: DocumentReducer,
  documentList: DocumentListReducer,
  userInfo: UserInfoReducer,
  navigationBar: NavigationBarReducer
});

export default rootReducer;
