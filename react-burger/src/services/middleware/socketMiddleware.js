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
  
        if (type === wsInit.type) {
          if (wsInit.type === "ws/wsOrdersConnect") {
            wsUrl = wsUrl + '?token=' + getAccessToken();
          }
          if (socket) {
            socket.close();
          }
          socket = new WebSocket(wsUrl);
        }
  
        if (socket) {
          socket.onopen = (event) => {
            dispatch(onOpen());
          };
  
          socket.onerror = (event) => {
            socket.close();
          };
  
          socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if (!data.success) {
              if (data.message === 'Invalid or missing token') {
                socket.close();
                refreshUserToken()
                  .then((status) => {
                    if (status && getAccessToken()){
                      dispatch(wsInit());
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
                dispatch(onMessage(data));
            };
            };  
          };
  
          socket.onclose = (event) => {
            dispatch(onClose());
          };

          if (type === onClose.type) {
            socket.close();
          };
        }
  
        next(action);
      };
    };
};