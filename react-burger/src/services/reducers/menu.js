import { 
  SET_ACTIVE_TAB_MENU
} from "../actions/menu";

const defaultState = 'bun';

export default function menuReducer (state = defaultState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB_MENU: {
      return action.currentMenu;
    }

    default:
      return state;
  }
};