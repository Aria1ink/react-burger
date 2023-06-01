import { getAccessToken } from '../../utils/tools/tokenTools';
import { refreshUserToken } from '../../utils/tools/userTools';
import { signOut } from '../../utils/tools/userTools';

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
      let socket = null

      return (next) => (action) => {
        const { dispatch } = store;
        const { type, } = action;
        const { wsInit, onOpen, onClose, onMessage } =
          wsActions;
  
        if (type === wsInit) {
          if (wsInit === "WS_ORDERS_CONNECT") {
            wsUrl = wsUrl + '?token=' + getAccessToken();
          }
          if (socket) {
            console.log('close')
            socket.close();
          }
          socket = new WebSocket(wsUrl);
        }
  
        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event) => {
            socket.close();
          };
  
          socket.onmessage = (event) => {
            console.log(onMessage)
            let data = JSON.parse(event.data);
            if (!data.success) {
              if (data.message === 'Invalid or missing token') {
                socket.close();
                refreshUserToken()
                  .then((status) => {
                    console.log(status)
                    if (status && getAccessToken()){
                      console.log('ok')
                      dispatch({ type: wsInit });
                    } else {
                      socket.close();
                      signOut(dispatch);
                    };
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              };
            } else {
              if (data.orders.length > 0) {
                dispatch({ type: onMessage, payload: data });
            };
            };  
          };
  
          socket.onclose = (event) => {
            console.log(onClose)
            dispatch({ type: onClose, payload: event });
          };

          if (type === onClose) {
            socket.close();
          };
        }
  
        next(action);
      };
    };
};