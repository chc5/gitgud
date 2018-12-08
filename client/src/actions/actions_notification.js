export const NOTIFICATION_RESET = "NOTIFICATION_RESET";

export function resetNotification(){
  console.log("resetNotification function");
  return {
    type: NOTIFICATION_RESET
  }
}
