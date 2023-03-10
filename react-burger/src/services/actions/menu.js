export const SET_ACTIVE_TAB_MENU = 'SET_ACTIVE_TAB_MENU';

export const setActiveMenuTab = (activeMenu) => {
  return ({ type: SET_ACTIVE_TAB_MENU, currentMenu: activeMenu})
};