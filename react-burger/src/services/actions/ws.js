export const WS_ORDERS_CONNECT = 'WS_ORDERS_CONNECT';
export const WS_SUCCESS = 'WS_SUCCESS';
export const WS_ORDERS_SUCCESS = 'WS_ORDERS_SUCCESS';
export const WS_FEED_SUCCESS = 'WS_FEED_SUCCESS';
export const WS_ORDERS_GET_MESSAGE = 'WS_ORDERS_GET_MESSAGE';
export const WS_ORDERS_DISCONNECT = 'WS_ORDERS_DISCONNECT';
export const WS_FEED_DISCONNECT = 'WS_FEED_DISCONNECT';
export const WS_FEED_CONNECT = 'WS_FEED_CONNECT';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';

export const userOrdersActions = {
  wsInit: WS_ORDERS_CONNECT,
  onOpen: WS_ORDERS_SUCCESS, 
  onClose: WS_ORDERS_DISCONNECT, 
  onMessage: WS_ORDERS_GET_MESSAGE, 
};
export const allOrdersActions = {
  wsInit: WS_FEED_CONNECT,
  onOpen: WS_FEED_SUCCESS, 
  onClose: WS_FEED_DISCONNECT, 
  onMessage: WS_FEED_GET_MESSAGE, 
};

export const connectWS = (page) => {
  switch(page){
    case 'orders': {
      return { type: WS_ORDERS_CONNECT }
    }
    case 'feed':{
      return { type: WS_FEED_CONNECT }
    }
    default:
      return null
  }
};
export const disconnectWS = (page) => {
  switch(page){
    case 'orders': {
      return { type: WS_ORDERS_DISCONNECT }
    }
    case 'feed':{
      return { type: WS_FEED_DISCONNECT }
    }
    default:
      return null
  }
};