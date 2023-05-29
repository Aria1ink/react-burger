export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
export const CLEAR_SELECTED_ORDER = 'CLEAR_SELECTED_ORDER';

export const setSelectedOrder = (order) => {
  return ({ type: SET_SELECTED_ORDER, order: order })
};

export const delSelectedOrder = () => {
  return ({ type: CLEAR_SELECTED_ORDER })
};