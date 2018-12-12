export const NOTIFICATION_RESET = "NOTIFICATION_RESET";
export const NOTIFICATION_ALERT = "NOTIFICATION_ALERT";
export function resetNotification(){
  return {
    type: NOTIFICATION_RESET
  }
}

export function makeNotification(msg){
  return {
    type: NOTIFICATION_ALERT,
    payload: msg
  }
}
