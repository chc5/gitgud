export const UPDATE_NAV_KEY = "UPDATE_NAV_KEY";
export const UPDATE_NAV_COLLAPSE = "UPDATE_NAV_COLLAPSE";

export function updateNavKey(key){
  console.log("Changing the navigation bar's key state");
  return {
    type: UPDATE_NAV_KEY,
    payload: key
  }
}

export function updateNavCollapse(){
  console.log("Changing the navigation bar's collapse state...");
  return{
    type: UPDATE_NAV_COLLAPSE
  }
}
