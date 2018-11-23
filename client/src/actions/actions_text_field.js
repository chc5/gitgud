import {
  UPDATE_TEXT_FIELD
} from '../constants/types_ui';

export function updateTextField(textField){
  return {
    type: UPDATE_TEXT_FIELD,
    payload: { data: textField }
  };
}
