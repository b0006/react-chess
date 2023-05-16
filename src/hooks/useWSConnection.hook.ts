import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useObserver } from 'mobx-react';
import { profileStore, wsStore } from '../store';
import { WS } from '../store/wsStore/types';

const WS_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const useWSConnection = (url = WS_URL, transport = 'websocket'): void => {
  const initConnection = useObserver(() => wsStore.initConnection);
  const token = useObserver(() => profileStore.token);
  const wsRef = useRef<WS>();

  useEffect(() => {
    if (token) {
      wsRef.current = io(url, {
        withCredentials: true,
        transports: [transport],
        auth: {
          token,
        },
      });
      initConnection(wsRef.current);
    }

    return () => {
      wsRef.current?.close();
    };
  }, [transport, url, token, initConnection]);
};

export { useWSConnection };
