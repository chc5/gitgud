import axios from 'axios';

export const UPDATE_TEXT_FIELD = "UPDATE_TEXT_FIELD";

export function updateTextField(textField){
  return {
    type: UPDATE_TEXT_FIELD,
    payload: { data: textField }
  };
}
