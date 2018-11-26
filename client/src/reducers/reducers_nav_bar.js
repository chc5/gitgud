import {
  UPDATE_NAV_KEY,
  UPDATE_NAV_COLLAPSE
} from '../constants/types_ui';

export default function(state = { key: [], collapsed: true }, action){
  switch(action.type){
    case UPDATE_NAV_KEY:
      return { key: [action.payload], collapsed: state.collapsed }
    case UPDATE_NAV_COLLAPSE:
      return { key: state.key, collapsed: !state.collapsed }
    default:
      return state;
  }
}
