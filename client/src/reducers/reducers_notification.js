export default function(state = "", action){
  if(action.payload){
    if(action.payload.msg){
      return action.payload.msg;
    }
    else if(action.payload.error){
      return action.payload.error;
    }
  }
  return state;
}
