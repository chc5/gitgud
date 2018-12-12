import { combineReducers } from 'redux';

import ApprovedTabooWordsReducer from './reducers_approved_taboo';
import DocComplaintReducer from './reducers_doc_complaint';
import DocComplaintListReducer from './reducers_doc_complaint_list';
import DocumentReducer from './reducers_document';
import DocumentListReducer from './reducers_doc_list';
import ErrorReducer from './reducers_error';
import NavBarReducer from './reducers_nav_bar';
import NotificationReducer from './reducers_notification';
import ProfileReducer from './reducers_profile';
import ProfileListReducer from './reducers_profile_list';
import TextFieldReducer from './reducers_text_field';
import UnappovedTabooWordsReducer from './reducers_unapproved_taboo';
import UserComplaintReducer from './reducers_user_complaint';
import UserComplaintListReducer from './reducers_user_complaint_list';
import UserEscalationReducer from './reducers_user_escalation';
import UserInfoReducer from './reducers_user_info';

const rootReducer = combineReducers({
  approvedTabooWords: ApprovedTabooWordsReducer,
  docComplaint: DocComplaintReducer,
  docComplaintList: DocComplaintListReducer,
  document: DocumentReducer,
  documentList: DocumentListReducer,
  error: ErrorReducer,
  navBar: NavBarReducer,
  notification: NotificationReducer,
  profile: ProfileReducer,
  profileList: ProfileListReducer,
  textField: TextFieldReducer,
  unapprovedTabooWords: UnappovedTabooWordsReducer,
  userEscalation: UserEscalationReducer,
  userInfo: UserInfoReducer,
  userComplaint: UserComplaintReducer,
  userComplaintList: UserComplaintListReducer
});

export default rootReducer;
