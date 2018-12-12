import { combineReducers } from 'redux';

import TextFieldReducer from './reducers_text_field';
import DocComplaintReducer from './reducers_doc_complaint';
import DocumentReducer from './reducers_document';
import ErrorReducer from './reducers_error';
import DocumentListReducer from './reducers_doc_list';
import UserInfoReducer from './reducers_user_info';
import NavBarReducer from './reducers_nav_bar';
import NotificationReducer from './reducers_notification';
import UserEscalationReducer from './reducers_user_escalation';
import DocComplaintListReducer from './reducers_doc_complaint_list';
import UserComplaintListReducer from './reducers_user_complaint_list';
import ApprovedTabooWordsReducer from './reducers_approved_taboo';
import UnappovedTabooWordsReducer from './reducers_unapproved_taboo';

const rootReducer = combineReducers({
  textField: TextFieldReducer,
  error: ErrorReducer,
  approvedTabooWords: ApprovedTabooWordsReducer,
  docComplaint: DocComplaintReducer,
  docComplaintList: DocComplaintListReducer,
  document: DocumentReducer,
  documentList: DocumentListReducer,
  userEscalation: UserEscalationReducer,
  userInfo: UserInfoReducer,
  userComplaintList: UserComplaintListReducer,
  navBar: NavBarReducer,
  notification: NotificationReducer,
  unapprovedTabooWords: UnappovedTabooWordsReducer
});

export default rootReducer;
