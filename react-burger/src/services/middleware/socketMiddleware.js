import { getAccessToken } from '../../utils/tools';
import { refreshUserToken } from '../../utils/user';

export const socketMiddleware = wsUrl => {
    return store => {
      let socketOrders = null;
      let socketFeed = null;

      return next => action => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
  
        if (type === 'WS_ORDERS_CONNECT') {
          socketOrders = new WebSocket(wsUrl + '/all');
        }
        if (type === 'WS_FEED_CONNECT') {
          socketFeed = new WebSocket(wsUrl + '?token=' + getAccessToken());
        }

        if (socketOrders) {
          socketOrders.onopen = event => {
            dispatch({ type: 'WS_ORDERS_SUCCESS', payload: event });
          };
          socketOrders.onerror = event => {
            console.log(event);
            socketOrders.close();
          };
          socketOrders.onmessage = event => {
            let data = JSON.parse(event.data);
            if (!data.success) {
              if (data.message === 'Invalid or missing token') {
                socketOrders.close();
                refreshUserToken()
                  .then((status) => {
                    if (status){
                      dispatch({ type: 'WS_ORDERS_CONNECT' });
                    } else {
                      socketOrders.close();
                    };
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              };
            };
            dispatch({
              type: 'WS_ORDERS_GET_MESSAGE',
              payload: data.orders.reverse(),
            });
          };
          socketOrders.onclose = event => {
            dispatch({ type: 'WS_ORDERS_DISCONNECT' });
          };
        }
        if (socketFeed) {
          socketFeed.onopen = event => {
            dispatch({ type: 'WS_FEED_SUCCESS', payload: event });
          };
          socketFeed.onerror = event => {
            console.log(event);
            socketFeed.close();
          };
          socketFeed.onmessage = event => {
            const { data } = event;
            dispatch({ type: 'WS_FEED_GET_MESSAGE', payload: data });
          };
          socketFeed.onclose = event => {
            dispatch({ type: 'WS_FEED_DISCONNECT' });
          };
        }

        if (type === 'WS_ORDERS_DISCONNECT') {
          socketOrders.close();
        }
  
        if (type === 'WS_FEED_DISCONNECT') {
          socketFeed.close();
        }

        next(action);
      };
    };
}; 