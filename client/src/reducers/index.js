import { combineReducers } from 'redux';

import TextFieldReducer from './reducers_text_field';
const rootReducer = combineReducers({
  textField: TextFieldReducer,
});

export default rootReducer;
