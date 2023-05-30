export const WS_ORDERS_CONNECT = 'WS_ORDERS_CONNECT';
export const WS_ORDERS_SUCCESS = 'WS_ORDERS_SUCCESS'; 
export const WS_ORDERS_DISCONNECT = 'WS_ORDERS_DISCONNECT';
export const WS_ORDERS_GET_MESSAGE = 'WS_ORDERS_GET_MESSAGE';

export const WS_FEED_CONNECT = 'WS_FEED_CONNECT';
export const WS_FEED_SUCCESS = 'WS_FEED_SUCCESS'; 
export const WS_FEED_DISCONNECT = 'WS_FEED_DISCONNECT';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';

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